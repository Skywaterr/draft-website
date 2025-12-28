module.exports = function (app) {
    app.use('/', require('./filters.js')(require('express').Router()));
    // app.use('/api/users', require('./users.js')(require('express').Router()));
    // app.use('/api/tasks', require('./tasks.js')(require('express').Router()));
}; 