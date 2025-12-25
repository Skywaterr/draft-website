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


// Builds up the SQL query based on /pokemon/filters
function buildPokemonFilters(query) {
    const filters = [];
    const params = [];

    for (const key of FILTERS) {
        console.log(query);
        const ops = query[key];
        console.log("Ops", key, query[key], ops);
        if (!ops || typeof ops !== "object") continue;     // skip if the filter is not in the query

        for (const [opKey, value] of Object.entries(ops)) {
            const sqlOp = OPS[opKey];
            const num = Number(value);
            console.log("keyvalue", sqlOp, num);
            if (!sqlOp || Number.isNaN(num)) continue;
            
            filters.push(`${key} ${sqlOp} ?`);
            params.push(num);
        }
    }

    let sql = `SELECT Pokemon, HP, Atk, Def, "S.At", "S.Df", Spd, BST FROM Pokemon`;
    if (filters.length > 0) {                                     // There are matching filters
        sql += " WHERE " + filters.join(" AND ");
    } else if (Object.keys(query).length > 0) {               // There are no matching filters, but filters were passed
        throw new Error("Filter has no correct arguments");
    }

    sql += " LIMIT 10";
    console.log(sql);
    return {sql, params};
}

module.exports = function(app) {
    const router = express.Router();

    // Examples, there can be any number of filters, as long as they are valid
    // /pokemon?hp[gt]=50 will return all pokemon with hp > 50
    // /pokemon?hp[gt]=50&spd[lte]=100 will return all pokemon with hp > 50 with speed <= 100

    router.get("/pokemon", async (req, res) => {
        try {
            const { sql, params } = buildPokemonFilters(req.query);
            const result = await db.execute(sql, params);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    })


    // Examples
    // /abilities/Hustle will return all pokemon with the Hustle ability by their capitalized name
    router.get("/abilities/:name", async (req, res) => {
        try {
            const name = req.params.name;
            const result = await db.execute(`SELECT p.Pokemon
                                             FROM Pokemon p
                                             JOIN PokemonAbilities pa
                                             ON pa.PokemonID = p.Name
                                             WHERE pa.AbilityName = "${name}" COLLATE NOCASE`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });
    

    app.use('/', router);
};
