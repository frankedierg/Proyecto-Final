var visitantesModel = {}
global.datos = [];
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ESTRUCTURA PARA LA COLECCIÓN
var userSchema = new Schema({
    //SCHEMA DE VISITANTES
    name:String,
    lname:String,
    document:String,
    unitname:String,
    complement:String,
    vehicle:String

})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('visitantes',userSchema)

visitantesModel.visitanteregistro = function(post,callback){

    const instancia = new MyModel
    instancia.name = post.name
    instancia.lname = post.lname
    instancia.document = post.document
    instancia.unitname = post.unitname
    instancia.complement = post.complement
    instancia.vehicle = post.vehicle
       

    instancia.save((error,visitorcreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(visitorcreated)
            return callback({state:true,info:visitorcreated})
        }
    })
   
}

visitantesModel.buscarvisitante = function (post, callback){

    MyModel.find({name:post.name},{id:1,name:1,lname:1,document:1,complement:1,vehicle:1},(error,registros) => {
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
visitantesModel.posicionvisitante = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.document == post.document
    })
   return callback(posicion)  
}

visitantesModel.listar = function(post,callback){
    MyModel.find({},{id:1,name:1,lname:1,document:1,unitname:1,complement:1,vehicle:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

visitantesModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{id:1,name:1,lname:1,document:1,unitname:1,complement:1,vehicle:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

visitantesModel.actualizarvisitante = function(post,callback){

    MyModel.findOneAndUpdate({document:post.document},
        {
            name:post.name,
            lname:post.lname,
            document:post.document,
            unitname:post.unitname,
            complement:post.complement,
            vehicle:post.vehicle
        },(error,visitantemodificado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:'Visitante modificado'})
        }

    })
    

}
visitantesModel.eliminarvisitante = function(post,callback){

    MyModel.findOneAndDelete({document:post.document} ,(error,eliminado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:"El visitante ha salido"})
        }
    })
  
}

module.exports.visitantesModel = visitantesModel;
