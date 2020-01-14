const routes = require('express').Router();

const DevController = require('./controllers/Dev.controller');
const SearchController = require('./controllers/Search.controller');

// Dev
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:_id', DevController.update);
routes.delete('/devs/:_id', DevController.destroy);

// Search
routes.get('/search', SearchController.index);

module.exports = routes;
