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



function nameFilter(name) {
    // Add name search to the current SQL query
    // Since most pokemon names are unique, this shouldn't return more than a few results
    const join_string = "";

    const search_string = `p.Pokemon COLLATE NOCASE = "${name}"`;
    return {join_string, search_string};
}

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

    // If move=NAME is used, we have to disable move-specific filters, and vice versa

    var used_move_name_filter = false;
    var used_move_specific_filter = false;

    


    for (const [key, value] of Object.entries(routeQuery)) {
        console.log(key, "testing");

        if (key.toLowerCase() === "ability") {
            filters.push(abilityFilter);
            args.push(value);
        } else if (key.toLowerCase() === "move") {
            if (used_move_specific_filter) {throw new Error ("Already used move specific filter, cannot use move=NAME")}
            used_move_name_filter = true;
            filters.push(moveFilter);
            args.push(value);
        } else if (STATS.includes(key.toLowerCase())) {
            filters.push(statFilter);
            args.push([key, value]);
        } else if (key.toLowerCase() === "movetype") {
            if ( used_move_name_filter ) { throw new Error ("Already used move name filter, cannot use movetype filter")}
            used_move_specific_filter = true;
            filters.push(moveTypeFilter);
            args.push(value);
        } else if (key.toLowerCase() === "class") {
            if ( used_move_name_filter ) { throw new Error ("Already used move name filter, cannot use class filter")}
            used_move_specific_filter = true;
            filters.push(classFilter);
            args.push(value);
        } else if (key.toLowerCase() === "power") {
            if ( used_move_name_filter ) { throw new Error ("Already used move name filter, cannot use power filter")}
            used_move_specific_filter = true;
            filters.push(powerFilter);
            args.push(value);
        } else if (key.toLowerCase() === "accuracy") {
            if ( used_move_name_filter ) { throw new Error ("Already used move name filter, cannot use accuracy filter")}
            used_move_specific_filter = true;
            filters.push(accuracyFilter);
            args.push(value);
        } else if (key.toLowerCase() === "name")  {
            filters.push(nameFilter);
            args.push(value);
        }
    }

    return {filters, args};
}

function buildQuery(filters, args) {
    // Using what is returned in req.query from the request route,
    // make an SQL query from it with the appropriate filters
    let sql = `SELECT DISTINCT p.ID, p.Name, p.Pokemon, p.Type1, p.Type2, HP, Atk, Def, "S.At", "S.Df", Spd, BST FROM Pokemon p\n`;
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


    // If joins were created, then we have queries
    if (joins.length !== 0) {        
        // Put WHERE in front of the first search,
        // then chain together the rest with ANDs
        sql += "\nWHERE ";
        sql += searches.join("\n AND ");
    }
    
    // Remove this limit later
    // sql += " LIMIT 10";
    console.log(sql);
    return sql;
}

function typeGenerator(name, resistances, weaknesses, immunities) {
    return {
        name:name,
        resistances: resistances,
        weaknesses: weaknesses,
        immunities: immunities,        
    }
    

}


const nullType = typeGenerator("", [], [], []);
const normalType = typeGenerator("Normal", [], ["Fighting"], ["Ghost"]);
const fireType = typeGenerator("Fire", ["Fire","Grass","Ice", "Bug", "Steel", "Fairy"], ["Water", "Ground", "Rock"], []);
const waterType = typeGenerator("Water", ["Water", "Fire", "Ice", "Steel"], ["Grass", "Electric"], []);
const electricType = typeGenerator("Electric", ["Electric", "Flying", "Steel"], ["Ground"], []);
const grassType = typeGenerator("Grass", ["Water", "Electric", "Grass", "Ground"], ["Fire", "Ice", "Poison", "Flying", "Bug"], []);
const iceType = typeGenerator("Ice", ["Ice"], ["Fire", "Fighting", "Rock", "Steel"], []);
const fightingType = typeGenerator("Fighting", ["Bug", "Rock", "Dark"], ["Flying", "Psychic", "Fairy"], []);
const poisonType = typeGenerator("Poison", ["Grass", "Fighting", "Poison", "Bug", "Fairy"], ["Ground", "Psychic"], []);
const groundType = typeGenerator("Ground", ["Poison", "Rock"], ["Water", "Grass", "Ice"], ["Electric"]);
const flyingType = typeGenerator("Flying", ["Grass", "Fighting", "Bug"], ["Electric", "Ice", "Rock"], ["Ground"]);
const psychicType = typeGenerator("Psychic", ["Fighting", "Psychic"], ["Bug", "Ghost", "Dark"], []);
const bugType = typeGenerator("Bug", ["Grass", "Fighting", "Ground"], ["Fire", "Flying", "Rock"], []);
const rockType = typeGenerator("Rock", ["Normal", "Fire", "Poison", "Flying"], ["Water", "Grass", "Fighting", "Ground", "Steel"], []);
const ghostType = typeGenerator("Ghost", ["Poison", "Bug"], ["Ghost", "Dark"], ["Normal", "Fighting"]);
const dragonType = typeGenerator("Dragon", ["Fire", "Water", "Electric", "Grass"], ["Ice", "Dragon", "Fairy"], []);
const darkType = typeGenerator("Dark", ["Ghost", "Dark"], ["Fighting", "Bug", "Fairy"], ["Psychic"]);
const steelType = typeGenerator("Steel", ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"], ["Fire", "Fighting", "Ground"], ["Poison"]);
const fairyType = typeGenerator("Fairy", ["Fighting", "Bug", "Dark"], ["Poison", "Steel"], ["Dragon"]);


let types = [normalType, fireType, waterType, electricType, grassType, iceType, fightingType, poisonType, 
    groundType, flyingType, psychicType, bugType, rockType, ghostType, dragonType, darkType, steelType, fairyType];

function calculateStrength(type1, type2, against) {
    // Given a Pokemon with two types and an enemy type, return the strength
    // that the Pokemon has against it. 

    // 0 strength means immune (We're ground, they're electric)
    // 1 strength means neutral 
    // < 1 strength means we're weak (We're fire, they're water)
    // > 1 strength means we're strong (We're water, they're fire)
    var strength = 1;
    var first_type = nullType;
    var second_type = nullType;

    // Grab the type objects
    for (const type of types) {
        // console.log(type.name === type1, type.name === type2, type.name, type1, type2);
        if (type.name === type1) {
            first_type = type;
        }

        if (type.name === type2) {
            second_type = type;
        }
    }
    // Find which category "against" is in
    for (const type of [first_type, second_type]) {
        // console.log("1", type, type.immunities, type.immunities.includes(against), against);
        if (type.resistances.includes(against)) {
            strength *= 2;
        } else if (type.weaknesses.includes(against)) {
            strength *= 0.5;
        } else if (type.immunities.includes(against)) {
            strength = 0;
            break;
        }
    }

 
    return strength;
}



function generateTypeFilters(routeQuery) {
    const types = [];
    const resistances = [];
    const immunities = [];
    const not_matches = [];

    // Flag for matching exactly these types, or any of these types
    var exact = null;
    
    // Flag for making the query at all
    // If everything is blank, don't even do the filtering
    var no_query = false;

    for (const [key, value] of Object.entries(routeQuery)) {
        if (key.toLowerCase() === "type") {
            types.push(value);
        } else if (key.toLowerCase() === "resist") {
            resistances.push(value);
        } else if (key.toLowerCase() === "immune") {
            immunities.push(value);
        } else if (key.toLowerCase() === "nottype") {
            not_matches.push(value);
        } else if (key.toLowerCase() === "exact") {
            exact = true;
        } else if (key.toLowerCase() === "any") {
            exact = false;
        }
    }

    if (types.length === 0 && resistances.length === 0 && immunities.length === 0 && not_matches.length === 0) {
        no_query = true;
    }
    return {types, resistances, immunities, not_matches, exact, no_query} 

}


function filterTypes(result_rows, types, resistances, immunities, not_matches, exact) {
    // Apply all those filters to rows, using calculateStrength as a helper
    var temp_rows = result_rows;
    var final_rows = [];

    // Flatten arrays, it sometimes appears as a 2D list because of route parameter passing
    types = types.flat();
    resistances = resistances.flat();
    immunities = immunities.flat();
    not_matches = not_matches.flat();

    // We're going to run rows through a few for loops, and sift it all the way down
    // Any of these types match with the current row: logical OR
    if (exact === false) {
        for (const row of temp_rows) {
            if (types.includes(row.Type1) || types.includes(row.Type2)) {
                final_rows.push(row);
            }
        }
    // All of these types match the current row: logical AND
    } else if (exact === true) {

        // If the exact types list has only one item, push "NULL" to it
        if (types.length === 1) {
            types.push("NULL");
        }

        for (const row of temp_rows) {
            if (types.includes(row.Type1) && types.includes(row.Type2) && types.length === 2) {
                final_rows.push(row);
            }
        }
    } else if (exact === null) {
        final_rows = result_rows;
    }

    // We gotta update the temp_variable every time
    temp_rows = final_rows;
    final_rows = [];
    

    // Find pokemon that resist certain types
    if (resistances.length !== 0) {
        for (const row of temp_rows) {
            // Keeps track of the strength of this Pokemon's typing against all resistances,
            // [1, 2, 2] represents neutral, good, and good resistance against types 1, 2, and 3 respectively.
            var resistance_scores = [];
            for (const type of resistances) {
                var strength = calculateStrength(row.Type1, row.Type2, type);
                resistance_scores.push(strength);
            }
            
            const minimum_resistance = Math.min(...resistance_scores);
            // If we resist all types, keep this Pokemon
            if (minimum_resistance > 1) {
                final_rows.push(row);
            }

        }
        temp_rows = final_rows;
        final_rows = [];
    }


    if (immunities.length !== 0) {
        for (const row of temp_rows) {
            var immunity_scores = [];
            for (const type of immunities) {
                // console.log(row.Type1, row.Type2, type, "Gonna start calculating");
                var strength = calculateStrength(row.Type1, row.Type2, type);
                immunity_scores.push(strength);
            }

            const max_strength = Math.max(...immunity_scores);
            if (max_strength === 0) {
                final_rows.push(row);
            }

        }
        temp_rows = final_rows;
        final_rows = [];
    }



    // If a Pokemon has a type that is in not_matches, exclude it
    if (not_matches.length !== 0) {
        for (const row of temp_rows) {
            if (not_matches.includes(row.Type1) || not_matches.includes(row.Type2)) {
                continue;
            } else {
                final_rows.push(row);
            }
        }
        return final_rows;
    }

    return temp_rows;

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
  

            const result = await db.execute(sql);
            var rows = result.rows;

            // If there are type queries, we use them after the result is gotten by db.execute  
            const {types, resistances, immunities, not_matches, exact, no_query} = generateTypeFilters(req.query);
            
            console.log("noquery", no_query);
            
            if (!no_query) {
                rows = filterTypes(result.rows, types, resistances, immunities, not_matches, exact);
            }

            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    })


    // Call the routes below to get all of the abilites/moves
    router.get("/abilities", async (req, res) => {
        try {
            const result = await db.execute(`SELECT DISTINCT AbilityName FROM PokemonAbilities ORDER BY AbilityName`);
            res.json(result.rows);
            console.log("abilities was pinged");
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });
    
    router.get("/moves", async (req, res) => {
        try {
            const result = await db.execute(`SELECT DISTINCT Move FROM Moves ORDER BY Move`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });


    router.get("/types", async (req, res) => {
        try {
            const result = await db.execute(`SELECT DISTINCT Type FROM Moves`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });

    router.get("/names", async (req, res) => {
        try {
            const result = await db.execute(`SELECT DISTINCT Name, Pokemon FROM Pokemon ORDER BY Pokemon`);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    })


    app.use('/', router);
};
