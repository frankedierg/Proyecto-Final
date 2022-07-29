var md5 = require('md5');
var sesionesModel = require('../modelos/sesionesModel').sesionesModel
var nodemailer = require('nodemailer');
//const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { config } = require('../../config');
//CRUD
var sesionesController = {}
//INICIO DE SESION USUARIOS
sesionesController.iniciarsesion = function(request,response){

    var post = {
        email:request.body.email,
        password:md5(request.body.password)
    }

    if(post.email == undefined || post.email == null || post.email == ''){
       response.json({state:false, mensaje:"Dato email es obligatorio"})
       return false;
   }

   if(post.password == undefined || post.password == null || post.password == ''){
       response.json({state:false, mensaje:"Dato Password es obligatorio"})
       return false;
   }

    sesionesModel.iniciarsesion(post,function(existe){
        if (existe == true) {
            response.json({state:true,mensaje:"Usuario logueado correctamente"})
        }
        else{
            response.json({state:false, mensaje:"Credenciales inválidas"})
        }
    })
  
}
//INICIO DE SESION ADMINISTRADOR
sesionesController.adminlogin = function(request,response){

    var post = {
        email:request.body.email,
        password:md5(request.body.password)
    }

    if(post.email == undefined || post.email == null || post.email == ''){
       response.json({state:false, mensaje:"Dato email es obligatorio"})
       return false;
   }

   if(post.password == undefined || post.password == null || post.password == ''){
       response.json({state:false, mensaje:"Dato Password es obligatorio"})
       return false;
   }

    sesionesModel.adminlogin(post,function(existe){
        if (existe == true) {
            response.json({state:true,mensaje:"Usuario logueado correctamente"})
        }
        else{
            response.json({state:false, mensaje:"Credenciales inválidas"})
        }
    })
  
}

//CREATE- REGISTRO USUARIOS-RESIDENTES
sesionesController.registro = function(request,response){

    var fname = request.body.fname
    var mname = request.body.mname
    var lname = request.body.lname
    var slname = request.body.slname
    var email = request.body.email
    var phone = request.body.phone
    var unitname = request.body.unitname
    var complement = request.body.complement
    var unitcategory = request.body.unitcategory
    var buildingname = request.body.buildingname
    var password = request.body.password
    var confirmar= request.body.confirmar
    var rol= request.body.rol
   console.log(fname)
   console.log(lname)
   console.log(email)
   console.log(password)
   //VALIDACIÓN PRIMER NOMBRE
   if(fname == undefined || fname == null || fname == ''){
       response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
       return false;
   }
   if(fname.length <=2){
       response.json({state:false, mensaje:"El campo nombre debe ser superior a 2 caracteres"})
       return false;
   }
   if(fname.length >=30){
       response.json({state:false, mensaje:"El campo nombre debe ser inferior a 30 caracteres"})
       return false;
   }
  
    //VALIDACIÓN PRIMER APELLIDO

   if(lname == undefined || lname == null || lname == ''){
       response.json({state:false, mensaje:"Dato Primer Apellido es obligatorio"})
       return false;
   }
   if(lname.length <=2){
       response.json({state:false, mensaje:"El campo primer apellido debe ser superior a 2 caracteres"})
       return false;
   }
   if(lname.length >=30){
       response.json({state:false, mensaje:"El campo primer apellido debe ser inferior a 30 caracteres"})
       return false;
   }
    //VALIDACIÓN EMAIL
   if(email == undefined || email == null || email == ''){
       response.json({state:false, mensaje:"Dato Email es obligatorio"})
       return false;
   }
   if(password == undefined || password == null || password == ''){
    response.json({state:false, mensaje:"Dato Password es obligatorio"})
    return false;
    }
    if(password.length < 6){
        response.json({state:false, mensaje:"El Password debe ser superior a 6 caracteres"})
        return false;
 
    }
    if(confirmar == undefined || confirmar == null || confirmar == ''){
        response.json({state:false, mensaje:"Debe confirmar el password"})
        return false;
    }
    if(confirmar != password){
        response.json({state:false, mensaje:"El Password no coincide con la confirmación"})
        return false;
    }

       
   var post = {
    fname:fname,
    mname:mname,
    lname: lname,
    slname:slname,
    unitname:unitname,
    complement:complement,
    unitcategory:unitcategory,
    buildingname:buildingname,
    email: email,
    phone:phone,
    password:md5(password),
    rol:rol
   }

     sesionesModel.buscaremail(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"El email ya existe, por favor intente con otro"})
        return false
    }
    else{
        sesionesModel.registro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Usuario registrado Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al guardar'})
            }
                   
        })
   }
   })
}
//CREATE- REGISTRO USUARIOS-STAFF ADMIN
sesionesController.adminregistro = function(request,response){

    var fname = request.body.fname
    var mname = request.body.mname
    var lname = request.body.lname
    var slname = request.body.slname
    var email = request.body.email
    var phone = request.body.phone
    var password = request.body.password
    var confirmar= request.body.confirmar
    var rol= request.body.rol
   console.log(fname)
   console.log(lname)
   console.log(email)
   console.log(password)
   //VALIDACIÓN PRIMER NOMBRE
   if(fname == undefined || fname == null || fname == ''){
       response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
       return false;
   }
   if(fname.length <=2){
       response.json({state:false, mensaje:"El campo nombre debe ser superior a 2 caracteres"})
       return false;
   }
   if(fname.length >=30){
       response.json({state:false, mensaje:"El campo nombre debe ser inferior a 30 caracteres"})
       return false;
   }
  
    //VALIDACIÓN PRIMER APELLIDO

   if(lname == undefined || lname == null || lname == ''){
       response.json({state:false, mensaje:"Dato Primer Apellido es obligatorio"})
       return false;
   }
   if(lname.length <=2){
       response.json({state:false, mensaje:"El campo primer apellido debe ser superior a 2 caracteres"})
       return false;
   }
   if(lname.length >=30){
       response.json({state:false, mensaje:"El campo primer apellido debe ser inferior a 30 caracteres"})
       return false;
   }
   
    //VALIDACIÓN EMAIL
   if(email == undefined || email == null || email == ''){
       response.json({state:false, mensaje:"Dato Email es obligatorio"})
       return false;
   }
   if(password == undefined || password == null || password == ''){
    response.json({state:false, mensaje:"Dato Password es obligatorio"})
    return false;
    }
    if(password.length < 6){
        response.json({state:false, mensaje:"El Password debe ser superior a 6 caracteres"})
        return false;
 
    }
    if(confirmar == undefined || confirmar == null || confirmar == ''){
        response.json({state:false, mensaje:"Debe confirmar el password"})
        return false;
    }
    if(confirmar != password){
        response.json({state:false, mensaje:"El Password no coincide con la confirmación"})
        return false;
    }

       
   var post = {
    fname:fname,
    mname:mname,
    lname: lname,
    slname:slname,
    email: email,
    phone:phone,
    password:md5(password),
    rol:rol
    
   }

     sesionesModel.buscaremail(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"El email ya existe, por favor intente con otro"})
        return false
    }
    else{
        sesionesModel.adminregistro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Usuario registrado Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al guardar'})
            }
                   
        })
   }
   })
}
//READ
sesionesController.listar = function(request,response){
    var post = {}
    sesionesModel.listar(post, function(listausuarios){
        response.json({state:true,usuarios:listausuarios})
    })
}

sesionesController.CargarId = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ''){
        response.json({state:false, mensaje:"Dato ID es obligatorio"})
        return false;
    }


    sesionesModel.CargarId(post, function(listausuarios){
        response.json({state:true,usuarios:listausuarios})
    })
}

//UPDATE
sesionesController.actualizar = function(request,response){
    var post = {
        fname:request.body.fname,
        mname:request.body.mname,
        lname:request.body.lname,
        slname:request.body.slname,
        email:request.body.email,
        phone:request.body.phone,
        unitname:request.body.unitname,
        complement:request.body.complement,
        unitcategory:request.body.unitcategory,
        building:request.body.building
        
    }
    if(post.email == undefined || post.email == null || post.email == ''){
        response.json({state:false, mensaje:"Dato Email es obligatorio"})
        return false;
    }
    if(post.fname == undefined || post.fname == null || post.fname == ''){
        response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
        return false;
    }
    if(post.lname == undefined || post.lname == null || post.lname == ''){
        response.json({state:false, mensaje:"Dato Apellido es obligatorio"})
        return false;
    }
    if(post.unitname == undefined || post.unitname == null || post.unitname == ''){
        response.json({state:false, mensaje:"Dato nombre de la Unidad es obligatorio"})
        return false;
    }
    if(post.building == undefined || post.building == null || post.building == ''){
        response.json({state:false, mensaje:"Dato Edificio es obligatorio"})
        return false;
    }
    if(post.unitcategory == undefined || post.unitcategory == null || post.unitcategory == ''){
        response.json({state:false, mensaje:"Dato Categoria de Unidad es obligatorio"})
        return false;
    }
    sesionesModel.actualizarnombre(post, function(resultado){
        response.json(resultado)
    })
        
}
//DELETE
sesionesController.eliminar = function(request,response){
    var post = {
        email:request.body.email
        
    }
    if(post.email == undefined || post.email == null || post.email == ''){
        response.json({state:false, mensaje:"Dato Email es obligatorio"})
        return false;
    }
    sesionesModel.eliminarusuario(post, function(resultado){
        console.log(resultado)
        response.json(resultado)
                
        })
    }


    // Email contactenos
    sesionesController.emailing = function(request,response){

        var post = {
            name:request.body.name,
            email:request.body.email,
            subject:request.body.subject,
            content:request.body.content
        }
        //validaciones


        var transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'horizonapp2022@gmail.com',
                pass:config.emailpass
            }
        });

        let mailOptions = {
            from:'horizonapp2022@gmail.com',
            to:'horizonapp2022@gmail.com',
            
            subject:post.subject,
            html:'<div style= "color:blue"> El usuario '+ post.name + ' '+ post.email+' nos solicita : '+post.content+'</div>'
            
        }
        transporter.sendMail(mailOptions,(error,info) => {
            if(error){
                console.log(error.message)
                response.json ({state:false,mensaje:error.message})
            }
            else{
                response.json ({state:true,mensaje:"correo enviado"})
            }
        })
    }


module.exports.sesionesController = sesionesController;

