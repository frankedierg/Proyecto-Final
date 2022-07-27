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

unidadesModel.unidadregistro = function(post,callback){

    const instancia = new MyModel
    instancia.unitname = post.unitname
    instancia.complement = post.complement
    instancia.buildingname = post.buildingname
    instancia.unitcategory = post.unitcategory
    

    instancia.save((error,unitcreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(unitcreated)
            return callback({state:true,info:unitcreated})
        }
    })
   
}

unidadesModel.buscarunidad = function (post, callback){

    MyModel.find({unitname:post.unitname},{id:1,unitname:1,complement:1,building:1,unitcategory:1,},(error,registros) => {
        if(error){
            console.log(error)
            return callback(false)
        }
        else{
            console.log(registros)
            console.log(registros.length)
            if (registros.length > 0) {
                return callback(true)                
            }
            else{
                return callback(false)
            }
        }
    })
        
}
unidadesModel.posicionunidad = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.email == post.email
    })
   return callback(posicion)  
}

unidadesModel.listar = function(post,callback){
    MyModel.find({},{id:1,unitname:1,complement:1,building:1,unitcategory:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

unidadesModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{id:1,fname:1,mname:1,lname:1,slname:1,email:1,phone:1,unitname:1,building:1,unitcategory:1,age:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

unidadesModel.actualizarunidad = function(post,callback){

    MyModel.findOneAndUpdate({unitname:post.unitname},
        {
            unitname:post.unitname,
            complement:post.complement,
            building:post.building,
            unitcategory:post.unitcategory
        },(error,usuariomodificado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:'Usuario modificado'})
        }

    })
    

}
unidadesModel.eliminarunidad = function(post,callback){

    MyModel.findOneAndDelete({unitname:post.unitname} ,(error,eliminado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:"Unidad eliminada"})
        }
    })
  
}

module.exports.unidadesModel = unidadesModel;
