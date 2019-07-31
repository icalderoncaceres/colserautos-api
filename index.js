import Joi from 'joi';
const express = require('express');

const app = express();

const modelSolicitud = Joi.object().keys({

});

const modelVirtuales = Joi.object().keys({

});

const modelInspecciones = Joi.object().keys({

});

const modelRecepciones = Joi.object().keys({

});

app.get('/', (req, res) => {
    res.send('Colserauto');
});

app.post('/setSolicitud', (req, res) => {

});

app.post('/setVirtuales', (req, res) => {

});

app.post('/inspecciones', (req, res) => {

});

app.post('/recepciones', () => {

});

app.listen(3300, () => {
    console.log('Running on port 3300');
});