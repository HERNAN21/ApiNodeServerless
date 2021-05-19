const express = require('express')
const app = express()
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const db = require('../../db-local');

app.use(bodyParser.json({ strict: false }));


// Obtener datos
app.get('/', function (req, res) {
  res.json("Hola Mundo");
})

// Obtener Listado de Personas
app.get('/persona', function(req, res){
  db.sequelize
  .query('select * from persona',{type: db.sequelize.QueryTypes.SELECT}
  )
  .then((result)=>{
      res.json(result);
      console.log(result);
  })
});

// Registrar Persona
app.post('/persona', function(req, res){
  console.log(req.body);
    var parameters={
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      dni: req.body.dni,
      email: req.body.email,
      celular: req.body.celular,
      fecha_nac: req.body.fecha_nac,
      direccion: req.body.direccion,
      nacionalidad: req.body.nacionalidad
    }
    // console.log(parameters);
    db.sequelize
        .query('INSERT INTO persona(nombre,apellido_paterno,apellido_materno,dni,email,celular,fecha_nac,direccion,nacionalidad)VALUES(:nombre,:apellido_paterno,:apellido_materno,:dni,:email,:celular,:fecha_nac,:direccion,:nacionalidad)',
        {replacements: parameters,type: db.sequelize.QueryTypes.INSERT}
    )
    .then((result)=>{
      res.json({'respuesta':'success', 'result':result})
    })
    .catch((e)=>{
        res.json({'respuesta':'error', 'result':e})
    });
});

// Actualizar Persona
app.put('/persona', function(req,res){
  var parameters={
    id: req.body.id,
    nombre: req.body.nombre,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno,
    dni: req.body.dni,
    email: req.body.email,
    celular: req.body.celular,
    fecha_nac: req.body.fecha_nac,
    direccion: req.body.direccion,
    nacionalidad: req.body.nacionalidad
  }
  console.log(parameters);
  var query =" update persona set nombre=:nombre, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, dni=:dni, email=:email, celular=:celular, fecha_nac=:fecha_nac, direccion=:direccion, nacionalidad=:nacionalidad where id=:id ";

    db.sequelize.query(query, {replacements:parameters,type: db.sequelize.QueryTypes.UPDATE})
    .then((result)=>{
        res.json({'respuesta':'success', 'result':result})
    })
    .catch((e)=>{
        res.json({'respuesta':'error','result':e});
        console.log(e);
    })
});

// Obtener Listado de Personas
app.get('/obtenerunapersona', function(req, res){
  console.log(req.params.idpersona);

  db.sequelize
  .query('select * from persona where id=:idpersona',{replacements: req.params.idpersona},{type: db.sequelize.QueryTypes.SELECT}
  )
  .then((result)=>{
      res.json(result);
      // console.log(result);
  })
});



module.exports.handler = serverless(app);