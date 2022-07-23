var unidadesModel = {}
global.datos = [];
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ESTRUCTURA PARA LA COLECCIÓN
var userSchema = new Schema({
    //SCHEMA DE LA UNIDAD
    unitname:String,
    complement:String,
    buildingname:String,
    unitcategory:String,

})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('unidades',userSchema)
