var express = require('express')
var config = require('./config.js').config
global.app = express();
const mongoose = require('mongoose');
global.path = require('path')
global.appRoot = path.resolve(__dirname)

mongoose.connect('mongodb://127.0.0.1:27017/'+ config.db,{useNewUrlParser:true,useUnifiedTopology:true},(error,respuesta)=>{
    if (error) {
        console.log(error)
    }
    else{
        console.log('Conexión a Mongo exitosa')
    }
})

var bodyParser = require('body-parser');
//const { default: mongoose } = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//ACCESO A CORS
var cors = require('cors');



app.use(cors({
  origin: function(origin, callback){
    console.log(origin)
    if(!origin) return callback(null, true);

    if(config.EnabledCors == true){

        if(config.origins.indexOf(origin) === -1){
            return callback('error cors', false);
        } 
    }

    return callback(null, true);

  }

}));
//FIN ACCESO A CORS

//CONFIGURACIÓN INICIAL PARA LAS SESIONES
var session = require("express-session")({
    secret:"mifrasesecreta",
    resave:true,
    saveUninitialized:true,
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:300000
    },
    name: "usuarios",
    rolling:true
    
})
app.use(session)
//FIN CONFIGURACION SESIONES

require('./rutas')


app.use('/',express.static(__dirname + '/Pagina'))//Expone el frontend
app.use('/backend/archivos',express.static(__dirname + '/backend/archivos'))//Expone el frontend subir archivos

app.listen(config.puerto, function(){
    console.log ('servidor funcionando por puerto: '+ config.puerto)
})
