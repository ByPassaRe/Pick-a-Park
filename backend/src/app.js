const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const routes = require('./routes');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const optionsSwagger = require("./config/swaggerOptions");
expressSwagger(optionsSwagger);
console.log(optionsSwagger.basedir)

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.attachToApp(app);

module.exports = app;