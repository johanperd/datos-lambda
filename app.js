require('./tracing'); 
const express = require('express');
const serverless = require('serverless-http');
const logger = require('./logger'); 

const app = express();

const datos = [
    { id: 1, nombre: 'pedro' },
    { id: 2, nombre: 'juan' },
    { id: 3, nombre: 'maria' },
    { id: 4, nombre: 'karina' },
    { id: 5, nombre: 'julieta' },
];

app.get('/datos', (req, res) => {
    logger.info('headers '+ req.headers);
    logger.info('Ruta /datos accedida, retornado datos {'+JSON.stringify(datos)+'}'); // Log de información
    res.send(JSON.stringify(datos));
});

// Exporta el manejador para AWS Lambda
module.exports.handler = serverless(app);
