const express = require('express');
const db = require('../db');
const { req } = require('agent-base');


// Query routes can only take these filters
const STATS = ["hp", "atk", "def", "s.at", "s.df", "spd", "bst"];


// Along with these operators
const OPS = {
  gt: ">",
  lt: "<",
  eq: "=",
  gte: ">=",
  lte: "<=",
};



function statFilter([stat, arg]) {
    // Add stat search to the current SQL query
    // stat should be a valid stat category such as 
    // arg should be a mapping of an operator to a required value, such as {gt: 50}

    if (!STATS.includes(stat)) {
        throw new Error(`${stat} is not a recognized stat`);
    }

    const mapping = Object.entries(arg)[0];
    const [operator, value] = mapping;

    if (!OPS[operator]) {
        throw new Error(`${operator} is not a recognized operator`);
    }

    

    const join_string = ""; // No JOIN needed because the Pokemon table is queried by default

                          //  HP           >                50   for example
    const search_string = `"${stat}" ${OPS[operator]} ${value}`; 

    return {join_string, search_string};
    
}


// I need to take an argument instead of just adding Overgrow
function abilityFilter(ability) {
    // Add ability search to the current SQL query
    // Always assume that the Pokemon table on Turso is named "p"
    // as defined in the toplevel build function
    const join_string = `JOIN PokemonAbilities pa ON pa.pokemonID = p.Name`;

    const search_string =`pa.AbilityName COLLATE NOCASE = "${ability}"`;

    return {join_string, search_string};
}

function moveFilter(moves) {
    // Add move search to the current SQL query
    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    // Make sure that moves is an array, or we can't use array.map
    if (!Array.isArray(moves)) {
        moves = [moves];
    }

    const sqlList = `(${moves.map(m => `'${m}'`).join(",")})`;
    const search_string = `m.Move COLLATE NOCASE IN ${sqlList}\n
    GROUP BY p.Pokemon\n
    HAVING COUNT(DISTINCT m.Move) = ${moves.length}
    `;


    return {join_string, search_string};
}

function moveTypeFilter(type) {
    // Add type search to the current SQL query
    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    const search_string = `m.Type COLLATE NOCASE = "${type}"`;

    return {join_string, search_string};
}

function classFilter(className) {
    // Filters moves based on Physical/Special attacks
    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    const search_string = `m.Class COLLATE NOCASE = "${className}"`;
    return {join_string, search_string};
}

function powerFilter(args) {
    // Filters for pokemon with moves between a certain base power
    // args is going to be a mapping of the form {start: value, end: value}
    // denoting which values we should use a >= or <= sign for when adding to the SQL

    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    var search_string = "";

    const start = args["start"];
    const end = args["end"];

    if (!start && !end) {
        throw new Error("Missing both arguments for power");
    }

    if (start && !end) {
        search_string += `m.Power >= ${start}`
    } else if (!start && end) {
        search_string += `m.Power <= ${end}`
    } else {
        search_string += `m.Power >= ${start} AND m.Power <= ${end}`;
    }

    return {join_string, search_string};
}


function accuracyFilter(args) {
    // Filters for Pokemon who can learn a move with some accuracy level. Can 
    // use the same operators as stats.
    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    const mapping = Object.entries(args)[0];
    const [operator, value] = mapping;

    if (!OPS[operator]) {
        throw new Error(`${operator} is not a recognized operator`);
    }

    const search_string = `m.Accuracy ${OPS[operator]} ${value}`; 

    return {join_string, search_string};
}

function generateFilters(routeQuery) {
    // Generate all the appropriate filters when parsing the route,
    // then return them in a list
    const filters = [];
    const args = [];
    for (const [key, value] of Object.entries(routeQuery)) {
        console.log(key, "testing");

        if (key.toLowerCase() === "ability") {
            filters.push(abilityFilter);
            args.push(value);
        } else if (key.toLowerCase() === "move") {
            console.log("SHOULD BE IN MOVE");
            filters.push(moveFilter);
            args.push(value);
        } else if (STATS.includes(key.toLowerCase())) {
            filters.push(statFilter);
            args.push([key, value]);
        } else if (key.toLowerCase() === "movetype") {
            filters.push(moveTypeFilter);
            args.push(value);
        } else if (key.toLowerCase() === "class") {
            filters.push(classFilter);
            args.push(value);
        } else if (key.toLowerCase() === "power") {
            filters.push(powerFilter);
            args.push(value);
        } else if (key.toLowerCase() === "accuracy") {
            filters.push(accuracyFilter);
            args.push(value);
        }
    }

    return {filters, args};
}

function buildQuery(filters, args) {
    // Using what is returned in req.query from the request route,
    // make an SQL query from it with the appropriate filters
    let sql = `SELECT DISTINCT p.Pokemon FROM Pokemon p\n`;
    var joins = [];
    const searches = [];

    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        const arg = args[i];
        const { join_string, search_string } = filter(arg);
        joins.push(join_string);
        searches.push(search_string);
    }
    
    // Get rid of all the duplicate strings
    const join_set = new Set(joins);
    joins = [...join_set];

    // Get all the relevant joins in one section of the query
    sql += joins.join("\n");

    // Put WHERE in front of the first search,
    // then chain together the rest with ANDs
    sql += "\nWHERE ";
    sql += searches.join("\n AND ");
    

    // Remove this limit later
    // sql += " LIMIT 10";
    console.log(sql);
    return sql;
}





module.exports = function(app) {
    const router = express.Router();

    // Examples, there can be any number of filters, as long as they are valid
    // localhost:3000/pokemon?ability=Overgrow&move=Vine Whip returns all pokemon with those two traits

    router.get("/pokemon", async (req, res) => {
        try {
            const {filters, args} = generateFilters(req.query);
            console.log(filters);
            console.log(args);
            const sql = buildQuery(filters, args);
            //const { sql, params } = buildPokemonFilters(req.query);
            const result = await db.execute(sql);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    })


    // Call the routes below to get all of the abilites/moves
    router.get("/abilities", async (req, res) => {
        try {
            const result = await db.execute(`SELECT DISTINCT AbilityName FROM PokemonAbilities`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });
    
    router.get("/moves", async (req, res) => {
        try {
            const result = await db.execute(`SELECT Move FROM Moves`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });



    app.use('/', router);
};
