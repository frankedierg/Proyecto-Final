var adminModel = {}
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
    pass:String,
    perfil:Number
    
})

//CREACIÓN DEL MODELO PARA LA COLECCIÓN DE LA DB
const MyModel = mongoose.model('admin',userSchema)


adminModel.registro = function(post,callback){

    const instancia = new MyModel
    instancia.fname = post.fname
    instancia.mname = post.mname
    instancia.lname = post.lname
    instancia.slname = post.slname
    instancia.email = post.email
    instancia.phone = post.phone
    instancia.pass = post.pass
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

adminModel.buscaremail = function (post, callback){

    MyModel.find({email:post.email},{fname:1,mname:1,lname:1,slname:1,phone:1,email:1},(error,registros) => {
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
adminModel.posicionemail = function (post, callback){
    var posicion = datos.findIndex((item)=> {
        return item.email == post.email
    })
   return callback(posicion)  
}
adminModel.iniciarsesion = function(post,callback){

    MyModel.find({email:post.email, pass:post.pass},{id:1,name:1,lname:1,email:1,perfil:1},(error,registros) => {
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

adminModel.listar = function(post,callback){
    MyModel.find({},{id:1,fname:1,mname:1,lname:1,slname:1,email:1,phone:1,},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

adminModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{id:1,fname:1,mname:1,lname:1,slname:1,email:1,phone:1,},(error,registros) => {
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback(registros)
        }

    })
}

adminModel.actualizarnombre = function(post,callback){

    MyModel.findOneAndUpdate({email:post.email},
        {
            fname:post.fname,
            mname:post.mname,
            lname:post.lname,
            slname:post.slname,
            email:post.email,
            phone:post.phone
           
        },(error,usuariomodificado)=>{
        if (error) {
            console.log(error)
            return callback({state:false, info:error})
        }
        else{
            return callback({state:true,mensaje:'Usuario modificado'})
        }

    })
    

}
adminModel.eliminarusuario = function(post,callback){

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
module.exports.adminModel = adminModel;

