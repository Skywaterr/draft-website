const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// For capturing arguments from routes, such as hp[lt]
app.set("query parser", "extended");

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Load routes
require('./routes/filters')(app); // pass app

app.listen(port, () => console.log('Server running on port ' + port));
