var md5 = require('md5')
//var md5 = require('md5');
var adminModel = require('../modelos/adminModel').adminModel
var nodemailer = require('nodemailer');
//const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { config } = require('../../config');
//CRUD
var adminController = {}
//INICIO DE SESION ADMINISTRACIÓN
adminController.iniciarsesion = function(request,response){

    var post = {
        email:request.body.email,
        pass:md5(request.body.pass)
    }

    if(post.email == undefined || post.email == null || post.email == ''){
       response.json({state:false, mensaje:"Dato email es obligatorio"})
       return false;
   }

   if(post.pass == undefined || post.pass == null || post.pass == ''){
       response.json({state:false, mensaje:"Dato Password es obligatorio"})
       return false;
   }

    adminModel.iniciarsesion(post,function(existe){
        if (existe.state == true) {
            console.log(existe)
            request.session.perfil = existe.registros[0].perfil
            response.json({state:true,mensaje:"Usuario logueado correctamente",perfil:existe.registros[0].perfil})
        }
        else{
            response.json({state:false, mensaje:"Credenciales inválidas"})
        }
    })
  
}
//CREATE- REGISTRO ADMINISTRACIÓN
adminController.registro = function(request,response){

    var fname = request.body.fname
    var mname = request.body.mname
    var lname = request.body.lname
    var slname = request.body.slname
    var email = request.body.email
    var phone = request.body.phone
    var pass = request.body.pass
    var confirmar= request.body.confirmar
    var perfil= request.body.perfil
   console.log(fname)
   console.log(lname)
   console.log(email)
   console.log(pass)
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
   if(pass == undefined || pass == null || pass == ''){
    response.json({state:false, mensaje:"Dato Password es obligatorio"})
    return false;
    }
    if(pass.length < 6){
        response.json({state:false, mensaje:"El Password debe ser superior a 6 caracteres"})
        return false;
 
    }
    if(confirmar == undefined || confirmar == null || confirmar == ''){
        response.json({state:false, mensaje:"Debe confirmar el pass"})
        return false;
    }
    if(confirmar != pass){
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
    pass:md5(pass),
    perfil:perfil
   }

     adminModel.buscaremail(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"El email ya existe, por favor intente con otro"})
        return false
    }
    else{
        adminModel.registro(post, function(dato){

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
adminController.listar = function(request,response){
    var post = {}
    adminModel.listar(post, function(listaadmin){
        response.json({state:true,admin:listaadmin})
    })
}

adminController.CargarId = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ''){
        response.json({state:false, mensaje:"Dato ID es obligatorio"})
        return false;
    }


    adminModel.CargarId(post, function(listaadmin){
        response.json({state:true,admin:listaadmin})
    })
}

//UPDATE
adminController.actualizar = function(request,response){
    var post = {
        fname:request.body.fname,
        mname:request.body.mname,
        lname:request.body.lname,
        slname:request.body.slname,
        email:request.body.email,
        phone:request.body.phone,
        
        
    }
        
    if(post.fname == undefined || post.fname == null || post.fname == ''){
        response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
        return false;
    }
    if(post.mname == undefined || post.mname == null || post.mname == ''){
        response.json({state:false, mensaje:"Dato segunso nombre es obligatorio"})
        return false;
    }
    if(post.lname == undefined || post.lname == null || post.lname == ''){
        response.json({state:false, mensaje:"Dato primer apellido es obligatorio"})
        return false;
    }
    if(post.slname == undefined || post.slname == null || post.slname == ''){
        response.json({state:false, mensaje:"Dato segundo apellido es obligatorio"})
        return false;
    }
    if(post.email == undefined || post.email == null || post.email == ''){
        response.json({state:false, mensaje:"Dato Email es obligatorio"})
        return false;
    }
    if(post.phone == undefined || post.phone == null || post.phone == ''){
        response.json({state:false, mensaje:"Dato teléfono es obligatorio"})
        return false;
    }
    adminModel.actualizarnombre(post, function(resultado){
        response.json(resultado)
    })
        
}
//DELETE
adminController.eliminar = function(request,response){
    var post = {
        email:request.body.email
        
    }
    if(post.email == undefined || post.email == null || post.email == ''){
        response.json({state:false, mensaje:"Dato Email es obligatorio"})
        return false;
    }
    adminModel.eliminarusuario(post, function(resultado){
        console.log(resultado)
        response.json(resultado)
                
        })
    }


    // Email contactenos
    adminController.emailing = function(request,response){

        var post = {
            name:request.body.name,
            email:request.body.email,
            subject:request.body.subject,
            content:request.body.content,
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
            cc: post.email,
            subject:post.subject,
            html:'<div style="color:blue;"> El usuario '+ post.name +' y correo '+ post.email+' nos solicita : '+post.content+'</div>'
            
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


module.exports.adminController = adminController;

