var sesionesModel = {}
global.datos = [];
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ESTRUCTURA PARA LA COLECCIÓN
var userSchema = new Schema({
    fname:String,
    mname:String,
    lname:String,
    slname:String,
    email:String,
    phone:String,
    password:String,
    perfil:Number,
    //SCHEMA DE LA UNIDAD
    unitname:String,
    complement:String,
    buildingname:String,
    unitcategory:String,

})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('members',userSchema)


sesionesModel.registro = function(post,callback){

    const instancia = new MyModel
    instancia.fname = post.fname
    instancia.mname = post.mname
    instancia.lname = post.lname
    instancia.slname = post.slname
    instancia.unitname = post.unitname
    instancia.complement = post.complement
    instancia.buildingname = post.buildingname
    instancia.unitcategory = post.unitcategory
    instancia.email = post.email
    instancia.phone = post.phone
    instancia.password = post.password
    instancia.perfil = 0

    instancia.save((error,usercreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(usercreated)
            return callback({state:true,info:usercreated})
        }
    })
   
}
sesionesModel.adminregistro = function(post,callback){

    const instancia = new MyModel
    instancia.fname = post.fname
    instancia.mname = post.mname
    instancia.lname = post.lname
    instancia.slname = post.slname
    instancia.email = post.email
    instancia.phone = post.phone
    instancia.password = post.password
    instancia.perfil = 1

    instancia.save((error,usercreated) => {
        if(error){
            console.log(error)
            return callback({state:false,info:error})
        }
        else{
            console.log(usercreated)
            return callback({state:true,info:usercreated})
        }
    })
   
}
sesionesModel.buscaremail = function (post, callback){

    MyModel.find({email:post.email},{fname:1,mname:1,lname:1,slname:1,phone:1,unitname:1,building:1,unitcategory:1,email:1},(error,registros) => {
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
sesionesModel.posicionemail = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.email == post.email
    })
   return callback(posicion)  
}
sesionesModel.iniciarsesion = function(post,callback){

    MyModel.find({email:post.email, password:post.password},{id:1,name:1,lname:1,email:1,perfil:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
           // return callback(registros)
           if (registros.length > 0) {
            return callback({state:true,registros:registros})
            
           }
           else{
            return callback({state:false})

           }
        }

    })
    
}

sesionesModel.adminlogin = function(post,callback){

    MyModel.find({email:post.email, password:post.password},{id:1,name:1,lname:1,email:1,perfil:1},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
           // return callback(registros)
           if (registros.length > 0) {
            return callback({state:true,registros:registros})
            
           }
           else{
            return callback({state:false})

           }
        }

    })
    
}




sesionesModel.listar = function(post,callback){
    MyModel.find({},{id:1,fname:1,mname:1,lname:1,slname:1,email:1,phone:1,unitname:1,complement:1,unitcategory:1,buildingname:1,},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

sesionesModel.CargarId = function(post,callback){
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

sesionesModel.actualizarnombre = function(post,callback){

    MyModel.findOneAndUpdate({email:post.email},
        {
            fname:post.fname,
            mname:post.mname,
            lname:post.lname,
            slname:post.slname,
            phone:post.phone,
            unitname:post.unitname,
            building:post.building,
            unitcategory:post.unitcategory,
            age:40
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
sesionesModel.eliminarusuario = function(post,callback){

    MyModel.findOneAndDelete({email:post.email} ,(error,eliminado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true, mensaje:"Usuario eliminado"})
        }
    })
  
}
module.exports.sesionesModel = sesionesModel;

