const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add posts
 *  @method GET /add-item
 */
route.get('/add-item', services.add_item)

/**
 *  @description for update item
 *  @method GET /update-item
 */
route.get('/update-item', services.update_item)


// API
route.post('/api/posts', controller.create);
route.get('/api/posts', controller.find);
route.put('/api/posts/:id', controller.update);
route.delete('/api/posts/:id', controller.delete);


module.exports = route