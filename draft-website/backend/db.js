// db.js
const { createClient } = require('@libsql/client');

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN // if you have auth token
});

module.exports = client;
