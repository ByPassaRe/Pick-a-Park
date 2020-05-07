const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const routes = require('./routes');

const app = express();

const optionsSwagger = require("./config/swaggerOptions");

const swaggerDocument = swaggerJsdoc(optionsSwagger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.attachToApp(app);

module.exports = app;