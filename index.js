import Joi from 'joi';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

const modelSolicitud = Joi.object().keys({
  
});

const modelVirtuales = Joi.object().keys({

});

const modelInspecciones = Joi.object().keys({

});

const modelRecepciones = Joi.object().keys({

});

const callAlians = async (obj) => {
  console.log(`Recibido Alians::::${JSON.stringify(obj)}`);
}

const callExperts = async (obj) => {
  console.log(`Recibido Experts::::${JSON.stringify(obj)}`);
}  

app.get('/', (req, res) => {
  res.send('Colserauto');
});

app.post('/setSolicitud', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const payload = req.body;
  const result = Joi.validate(payload, modelSolicitud);
  if(result.error) {
      res.status(422).json({
        title: 'Invalid formar',
        data: result.error,
        message: result.error.message
      });
      return;
  }

  (async() => {
    try {
      await callAlians(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onAlians',
        message: 'Error onAlians'
      });
    }
    res.send(200).json({
      message: 'Solicitud exitosa'
    });
  });
  
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