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



function statFilter(stats, args) {
    // Add stat search to the current SQL query
    // stats should be a list of required stats such as [atk, def, spd]
    // args should be a mapping of operators to the values required, such as {gt: 50, lte: 100}

    
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


// Okay you can't just add onto the query like that, I suppose
// I need a format where I can use build to do it


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




// Builds up the SQL query based on /pokemon/filters
// function buildPokemonFilters(query) {
//     const filters = [];
//     const params = [];

//     for (const key of FILTERS) {
//         console.log(query);
//         const ops = query[key];
//         console.log("Ops", key, query[key], ops);
//         if (!ops || typeof ops !== "object") continue;     // skip if the filter is not in the query

//         for (const [opKey, value] of Object.entries(ops)) {
//             const sqlOp = OPS[opKey];
//             const num = Number(value);
//             console.log("keyvalue", sqlOp, num);
//             if (!sqlOp || Number.isNaN(num)) continue;
            
//             filters.push(`${key} ${sqlOp} ?`);
//             params.push(num);
//         }
//     }

//     let sql = `SELECT Pokemon, HP, Atk, Def, "S.At", "S.Df", Spd, BST FROM Pokemon`;
//     if (filters.length > 0) {                                     // There are matching filters
//         sql += " WHERE " + filters.join(" AND ");
//     } else if (Object.keys(query).length > 0) {                   // There are no matching filters, but filters were passed
//         throw new Error("Filter has no correct arguments");
//     }

//     sql += " LIMIT 10";
//     console.log(sql);
//     return {sql, params};
// }

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
