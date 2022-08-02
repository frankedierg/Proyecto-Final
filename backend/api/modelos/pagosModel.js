var pagosModel = {}
global.datos = [];
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ESTRUCTURA PARA LA COLECCIÓN
var userSchema = new Schema({
    //SCHEMA DE LA pagos

    nombre:String,
    apellido:String,
    unitname:String,
    complement:String,
    paymentdate:String,
    monthpayment:String,
    file:String
    

})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('pagos',userSchema)

pagosModel.pagosregistro = function(post,callback){

    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.unitname =post.unitname
    instancia.complement = post.complement
    instancia.paymentdate =post.paymentdate
    instancia.monthpayment = post.monthpayment
    instancia.file = post.file
   
    

    instancia.save((error,pagocreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(pagocreated)
            return callback({state:true,info:pagocreated})
        }
    })
   
}

pagosModel.buscapagos = function (post, callback){

    MyModel.find({unitname:post.unitname},{id:1,nombre:1,apellido:1,unitname:1,complement:1,paymentdate:1,monthpayment:1,file:1},(error,registros) => {
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
pagosModel.posicionpagos = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.email == post.email
    })
   return callback(posicion)  
}

pagosModel.listar = function(post,callback){
    MyModel.find({},{id:1,nombre:1,apellido:1,unitname:1,complement:1,paymentdate:1,monthpayment:1,file:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

pagosModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{id:1,nombre:1,apellido:1,unitname:1,complement:1,paymentdate:1,monthpayment:1,file:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

pagosModel.actualizapagos = function(post,callback){

    MyModel.findOneAndUpdate({unitname:post.unitname},
        {
            nombre:post.nombre,
            apellido:post.apellido,
            unitname:post.unitname,
            complement:post.complement,
            paymentdate:post.paymentdate,
            monthpayment:post.monthpayment,
            file:post.file
        },(error,pagomodificada)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:'Pago Modificado'})
        }

    })
    

}
pagosModel.eliminapagos = function(post,callback){

    MyModel.findOneAndDelete({nombre:post.nombre,apellido:post.apellido,unitname:post.unitname,complement:post.complement,paymentdate:post.paymentdate,monthpayment:post.monthpayment,file:post.file} ,(error,eliminado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:"Pago eliminado"})
        }
    })
  
}

module.exports.pagosModel = pagosModel;
