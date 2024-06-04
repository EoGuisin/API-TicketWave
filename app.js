const express = require("express");
var cors = require('cors');
const app = express();
const morgan = require("morgan");
const routeUser = require('./routes/user');
const routeEvent = require('./routes/event');
const bodyParser = require('body-parser');

app.use(cors({origin: true, credentials: true}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    };
    next();
});

app.use('/', routeUser);

app.use('/', routeEvent);

app.use((req, res, next) => {
    const error = new Error();
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: 'Não encontrado',
        status: 404,
    });
});

module.exports = app;