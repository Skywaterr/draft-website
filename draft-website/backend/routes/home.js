const express = require('express');
const db = require('../db');
const { req } = require('agent-base');


// Query routes can only take these filters
const FILTERS = ["hp", "atk", "def", "s.at", "s.df", "spd", "bst"];

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

    if (!FILTERS.includes(stat)) {
        throw new Error(`${stat} is not a recognized stat`);
    }

    const mapping = Object.entries(arg)[0];
    const [operator, value] = mapping;

    console.log(operator);
    if (!OPS[operator]) {
        throw new Error(`${operator} is not a recognized operator`);
    }

    

    const join_string = ""; // No JOIN needed because the Pokemon table is queried by default

                          //  HP           >                50   for example
    const search_string = `${stat} ${OPS[operator]} ${value}`; 

    return {join_string, search_string};
    
}


// I need to take an argument instead of just adding Overgrow
function abilityFilter(ability) {
    // Add ability search to the current SQL query
    // Always assume that the Pokemon table on Turso is named "p"
    // as defined in the toplevel build function
    const join_string = `JOIN PokemonAbilities pa ON pa.pokemonID = p.Name`;

    const search_string =`pa.AbilityName = "${ability}"`;

    return {join_string, search_string};
}

function moveFilter(move) {
    // Add ability search to the current SQL query
    const join_string = `
    JOIN PokemonMoves pm ON pm.PokemonID = p.Name\n
    JOIN Moves m ON pm.MoveID = m.Name
    `;

    const search_string = `m.Move = "${move}"`;

    return {join_string, search_string};
}


function generateFilters(routeQuery) {
    // Generate all the appropriate filters when parsing the route,
    // then return them in a list
    const filters = [];
    const args = [];
    for (const [key, value] of Object.entries(routeQuery)) {
        if (key.toLowerCase() === "ability") {
            filters.push(abilityFilter);
            args.push(value);
        } else if (key.toLowerCase() === "move") {
            filters.push(moveFilter);
            args.push(value);
        } else if (FILTERS.includes(key.toLowerCase())) {
            filters.push(statFilter);
            args.push([key, value]);
        }
    }

    return {filters, args};
}

function buildQuery(filters, args) {
    // Using what is returned in req.query from the request route,
    // make an SQL query from it with the appropriate filters
    let sql = `SELECT p.Pokemon FROM Pokemon p\n`;
    const joins = [];
    const searches = [];

    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        const arg = args[i];
        const { join_string, search_string } = filter(arg);
        joins.push(join_string);
        searches.push(search_string);
    }

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


    // This is now invalidated because of all queries will go in one master search route
    // router.get("/abilities/:name", async (req, res) => {
    //     try {
    //         const name = req.params.name;
    //         const result = await db.execute(`SELECT p.Pokemon
    //                                          FROM Pokemon p
    //                                          JOIN PokemonAbilities pa
    //                                          ON pa.PokemonID = p.Name
    //                                          WHERE pa.AbilityName = "${name}" COLLATE NOCASE`);
    //         res.json(result.rows);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ error: 'Database query failed' });
    //     }
    // });
    
    // router.get("/moves/:name", async (req, res) => {
    //     try {
    //         const name = req.params.name;
    //         const result = await db.execute(`SELECT p.Pokemon                               -- Get all the Pokemon names only if where
    //                                          FROM Pokemon p                                 -- the PokemonMoves dataset relates a Pokemon to
    //                                          JOIN PokemonMoves pm                           -- the queried move
    //                                          ON pm.PokemonID = p.name
    //                                          JOIN Moves m
    //                                          ON pm.MoveID = m.name
    //                                          WHERE m.Move = "${name}" COLLATE NOCASE`);
    //         res.json(result.rows);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ error: 'Database query failed' });
    //     }
    // });



    app.use('/', router);
};
