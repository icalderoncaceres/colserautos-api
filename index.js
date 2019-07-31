const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
axios = require('axios');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

const aliansServiceUrl = 'http://localhost:4200';
const expertServiceUrl = 'http://localhost:4200';

const modelSolicitud = Joi.object().keys({
  Credencial: Joi.string().required(),
  NoSolicitud: Joi.string().required(),
  CodigoCentroServicio: Joi.string().required(),
  Cliente_Nombres: Joi.string().required(),
  Cliente_Apellidos: Joi.string(),
  NoIdentificacion: Joi.string().required(),
  TipoIdentificación: Joi.string().required(),
  Servicio: Joi.string().required(),
  CodigoSucursal: Joi.string().required(),
  NoIdentificacionAsesor: Joi.string().required(),
  Placa: Joi.string().required(),
  TipoVehiculo: Joi.string().required(),
});

const modelVirtuales = Joi.object().keys({
  InspeccionVirtual: Joi.boolean().required(),
  NombreContacto: Joi.string().required(),
  Celular: Joi.number().integer().required(),
  ContactoIntermediario: Joi.number().integer().required(),
  CorreoElectronico: Joi.string().required(),
  Intermediario: Joi.string().required(),
  DireccionInspeccion: Joi.string().required(),
  Localidad: Joi.number().integer().required(),
});

const modelInspecciones = Joi.object().keys({
  InspeccionVirtual: Joi.boolean().required(),
  Placa: Joi.string().required(),
  IdOrden: Joi.number().integer().required(),
  NombreContacto: Joi.string().required(),
  Celular: Joi.number().integer().required(),
  ContactoIntermediario: Joi.number().integer().required(),
  CorreoElectronico: Joi.string().required(),
  Intermediario: Joi.string().required(),
  DireccionInspeccion: Joi.string().required(),
  Localidad: Joi.number().integer().required(),
});

const modelRecepciones = Joi.object().keys({
  OrdenServicio: Joi.object().keys({
    IdOrden: Joi.number().integer().required(),
    Placa: Joi.string().required(),
    ValorCliente: Joi.number(),
    ValorFasecolda: Joi.number(),
    ValorColserauto: Joi.number(),
    Asegurable: Joi.number().integer(),
    FechaIngreso: Joi.date().required(),
    TipoVehiculo: Joi.string(),
    Domicilio: Joi.boolean(),
    FechaRegistro: Joi.date().required(),
    InspeccionVirtual: Joi.boolean().required(),
  }).required(),
  Cliente: Joi.object().keys({
    NoId: Joi.string().required(),
    Nombres: Joi.string().required(),
    Apellidos: Joi.string(),
    Sexo: Joi.string(),
    Edad: Joi.number().integer(),
    Direccion: Joi.string(),
    Telefono: Joi.string(),
    Email: Joi.string(),
    IDTipoId: Joi.string(),
  }).required(),
  Vehiculo: Joi.object().keys({
    Placa: Joi.string().required(),
    Fasecolda: Joi.string().required(),
    Modelo: Joi.string().required(),
    NoMotor: Joi.string().required(),
    NoChasis: Joi.string().required(),
    NoSerie: Joi.string().required(),
    Kilometraje: Joi.string().required(),
    TipoPintura: Joi.string().required(),
    Clase: Joi.string().required(),
    Marca: Joi.string().required(),
    Referencia: Joi.string().required(),
    Cilindraje: Joi.string().required(),
    Referencia: Joi.string(),
    Cilindraje: Joi.number().integer(),
    Combustible: Joi.string().required(),
    Nacionalidad: Joi.string(),
    TipoCaja: Joi.string(),
    AfiliacionServicioPublico: Joi.string(),
    IdColor: Joi.string(),
    Color: Joi.string(),
    IdTipoServicio: Joi.string(),
    TipoServicio: Joi.string(),
    IDTipoCarroceria: Joi.string(),
    TipoCarrocería: Joi.string(),
    VigenciaRTM: Joi.date(),
    VigenciaSOAT: Joi.date(),
  }).required(),
  Accesorios: Joi.object().keys({
    IdOrden: Joi.number().integer().required(),
    IdAccesorio: Joi.string(),
    Accesorio: Joi.string(),
    Cantidad: Joi.number().integer(),
    Total: Joi.number(),
    Categoria: Joi.string(),
    ReferenciaDescripcion: Joi.string(),
    Asegurable: Joi.boolean().required(),
    Marca: Joi.string().required(),
  }).required(),
    IdOrden: Joi.number().integer().required(),
    Novedad: Joi.object().keys({
    IdNovedad: Joi.string(),
    Novedad: Joi.string(),
    ConceptoAsegurable: Joi.number().integer().required(),
  }).required(),
  Observacion: Joi.object().keys({
    IdOrden: Joi.number().integer().required(),
    IdDetalleServicio: Joi.number().integer().required(),
    DetalleServicio: Joi.string().required(),
    Observacion: Joi.string().required(),
  }).required(),
  fotos: Joi.object().keys({
    IdOrden: Joi.number().integer().required(),
    Directorio: Joi.string().required(),
    Foto: Joi.string().required(),
    Tipo: Joi.string(),
  }).required()
});

const callAlians = async (obj) => {
  console.log(`Recibido Alians::::${JSON.stringify(obj)}`);
  /*
  const endpointUrl = `${aliansServiceUrl}`
  let serviceResponse
  try {
    serviceResponse = await axios.post(endpointUrl, {
      obj
    });
    return serviceResponse
  } catch (err) {
    return false;
  }
  */
 return {
   data: {
     id: 1
   },
   message: 'Respuesta dummy, será reemplazada por webhooks de alians'
 }
}

const callExperts = async (obj) => {
  console.log(`Recibido Experts::::${JSON.stringify(obj)}`);
  const endpointUrl = `${expertServiceUrl}`
  /*
  let serviceResponse
  try {
    serviceResponse = await axios.post(endpointUrl, {
      obj
    });
    return serviceResponse
  } catch (err) {
    return false;
  } 
  */
 return {
    data: {
      id: 1
    },
    message: 'Respuesta dummy, será reemplazada por webhooks de alians'
  }

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
      title: 'Invalid format',
      data: result.error,
      message: result.error.message
    });
    return;
  }

  const response = [
      {
        origin: 'alians',
        result: ''
      },
      {
        origin: 'Expert',
        result: ''
      }
  ];
  (async() => {
    try {
      response[0].result = await callAlians(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onAlians',
        message: 'Error onAlians'
      });
      return;
    }

    try {
      response[1].result = await callExperts(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onExpert',
        message: 'Error oExpert'
      });
      return;
    }
    if(payload.TipoIdentificación !== 'CC' 
      && payload.TipoIdentificación !== 'PA'
      && payload.TipoIdentificación !== 'PEP'){
        res.status(201).json({
          valor: 70,
          definicion: 'Tipo de Identificación inválido',
        });
    }
    if(parseInt(payload.CodigoSucursal) > 30) {
      res.status(201).json({
        valor: 60,
        definicion: 'Sucursal Inválida ',
      });
    }

    if(parseInt(payload.NoIdentificacionAsesor) > 30) {
      res.status(201).json({
        valor: 50,
        definicion: 'Intermediario no válido ',
      });
    }

    res.status(200).json({
      message: 'Solicitud exitosa',
      response
    });
  })();
  
});

app.post('/setVirtuales', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const payload = req.body;
  const result = Joi.validate(payload, modelVirtuales);
  if(result.error) {
    res.status(422).json({
      title: 'Invalid format',
      data: result.error,
      message: result.error.message
    });
    return;
  }

  const response = [
      {
        origin: 'alians',
        result: ''
      },
      {
        origin: 'Expert',
        result: ''
      }
  ];
  (async() => {
    try {
      response[0].result = await callAlians(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onAlians',
        message: 'Error onAlians'
      });
      return;
    }

    try {
      response[1].result = await callExperts(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onExpert',
        message: 'Error oExpert'
      });
      return;
    }
    res.status(200).json({
      message: 'Solicitud exitosa',
      response
    });
  })();
  
});

app.post('/InspeccionVirtual', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const payload = req.body;
  const result = Joi.validate(payload, modelInspecciones);
  if(result.error) {
    res.status(422).json({
      title: 'Invalid format',
      data: result.error,
      message: result.error.message
    });
    return;
  }

  const response = [
      {
        origin: 'alians',
        result: ''
      },
      {
        origin: 'Expert',
        result: ''
      }
  ];
  (async() => {
    try {
      response[0].result = await callAlians(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onAlians',
        message: 'Error onAlians'
      });
      return;
    }

    try {
      response[1].result = await callExperts(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onExpert',
        message: 'Error oExpert'
      });
      return;
    }
    res.status(200).json({
      message: 'Solicitud exitosa',
      response
    });
  })();
  
});

app.post('/recepcionVirtual', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const payload = req.body;
  const result = Joi.validate(payload, modelRecepciones);
  if(result.error) {
    res.status(422).json({
      title: 'Invalid format',
      data: result.error,
      message: result.error.message
    });
    return;
  }

  const response = [
      {
        origin: 'alians',
        result: ''
      },
      {
        origin: 'Expert',
        result: ''
      }
  ];
  (async() => {
    try {
      response[0].result = await callAlians(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onAlians',
        message: 'Error onAlians'
      });
      return;
    }

    try {
      response[1].result = await callExperts(payload);
    } catch (err) {
      res.status(500).json({
        data: err,
        title: 'Error onExpert',
        message: 'Error oExpert'
      });
      return;
    }
    res.status(200).json({
      message: 'Solicitud exitosa',
      response
    });
  })();
  
});

app.listen(3300, () => {
    console.log('Running on port 3300');
});