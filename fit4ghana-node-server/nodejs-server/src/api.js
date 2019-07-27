"use strict";

const express     = require('express');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const middlewares = require('./middlewares');
const busboyBodyParser = require('busboy-body-parser');

const fit4ghana  = require('./routes/fit4ghana');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);
api.use(busboyBodyParser());


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Fit4Ghana Blockchain Backend'
    });
});

// API routes
api.use('/fit4ghana', fit4ghana);


module.exports = api;
