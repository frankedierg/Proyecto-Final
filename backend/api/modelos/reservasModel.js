var reservasModel = {}
global.datos = [];
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ESTRUCTURA PARA LA COLECCIÓN
var userSchema = new Schema({
    //SCHEMA DE LA reservas

    nombre:String,
    apellido:String,
    unitname:String,
    complement:String,
    initdate:String,
    enddate:String,
    area:String
    

})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('reservas',userSchema)

reservasModel.reservasregistro = function(post,callback){

    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.unitname =post.unitname
    instancia.complement = post.complement
    instancia.initdate =post.initdate
    instancia.enddate = post.enddate
    instancia.area = post.area
   
    

    instancia.save((error,reservacreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(reservacreated)
            return callback({state:true,info:reservacreated})
        }
    })
   
}

reservasModel.buscareservas = function (post, callback){

    MyModel.find({unitname:post.unitname},{id:1,nombre:1,apellido:1,unitname:1,complement:1,initdate:1,enddate:1,area:1},(error,registros) => {
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
reservasModel.posicionreservas = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.email == post.email
    })
   return callback(posicion)  
}

reservasModel.listar = function(post,callback){
    MyModel.find({},{id:1,nombre:1,apellido:1,unitname:1,complement:1,initdate:1,enddate:1,area:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

reservasModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{id:1,nombre:1,apellido:1,unitname:1,complement:1,initdate:1,enddate:1,area:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

reservasModel.actualizareservas = function(post,callback){

    MyModel.findOneAndUpdate({unitname:post.unitname},
        {
            nombre:post.nombre,
            apellido:post.apellido,
            unitname:post.unitname,
            complement:post.complement,
            initdate:post.initdate,
            enddate:post.enddate,
            area:post.area
        },(error,reservamodificada)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:'Reserva Modificada'})
        }

    })
    

}
reservasModel.eliminareservas = function(post,callback){

    MyModel.findOneAndDelete({nombre:post.nombre,apellido:post.apellido,unitname:post.unitname,complement:post.complement,initdate:post.initdate,enddate:post.enddate,area:post.area} ,(error,eliminado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:"reservas eliminada"})
        }
    })
  
}

module.exports.reservasModel = reservasModel;
