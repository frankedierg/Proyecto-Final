var visitantesModel = require('../modelos/visitantesModel').visitantesModel
var visitantesController = {}
//CREATE- REGISTRO USUARIOS-RESIDENTES
visitantesController.visitanteregistro = function(request,response){

    var name = request.body.name
    var lname = request.body.lname
    var document = request.body.document
    var unitname = request.body.unitname
    var complement = request.body.complement
    var vehicle = request.body.vehicle
      //VALIDACIÓN PRIMER NOMBRE
   if(name == undefined || name == null || name == ''){
       response.json({state:false, mensaje:"Dato nombre es obligatorio"})
       return false;
   }
   
    //VALIDACIÓN APELLIDO

   if(lname == undefined || lname == null || lname == ''){
       response.json({state:false, mensaje:"Dato Apellido es obligatorio"})
       return false;
   }

       //VALIDACIÓN DOCUMENTO

       if(document == undefined || document == null || document == ''){
        response.json({state:false, mensaje:"Dato Documento es obligatorio"})
        return false;
    }

        //VALIDACIÓN UNIDAD-APARTAMENTO

   if(unitname == undefined || unitname == null || unitname == ''){
    response.json({state:false, mensaje:"Dato Apartamento es obligatorio"})
    return false;
    }
   
        //VALIDACIÓN INTERIOR

   if(complement == undefined || complement == null || complement == ''){
    response.json({state:false, mensaje:"Dato Interior es obligatorio"})
    return false;
    }

    

       
   var post = {
    name:name,
    lname: lname,
    document:document,
    unitname:unitname,
    complement:complement,
    vehicle:vehicle
}

visitantesModel.buscarvisitante(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"El visitante no ha registrado salida"})
        return false
    }
    else{
        visitantesModel.visitanteregistro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Visitante registrado Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al registrar'})
            }
                   
        })
   }
   })
   
}


//READ
visitantesController.listar = function(request,response){
    var post = {}
    visitantesModel.listar(post, function(listarvisitantes){
        response.json({state:true,visitantes:listarvisitantes})
    })
}

visitantesController.CargarId = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ''){
        response.json({state:false, mensaje:"Dato ID es obligatorio"})
        return false;
    }


    visitantesModel.CargarId(post, function(listausuarios){
        response.json({state:true,usuarios:listausuarios})
    })
}

//UPDATE
visitantesController.actualizar = function(request,response){
    var post = {
        name:request.body.name,
        lname:request.body.lname,
        document:request.body.document,
        unitname:request.body.unitname,
        complement:request.body.complement,
        vehicle:request.body.vehicle
        
    }
    
    if(post.name == undefined || post.name == null || post.name == ''){
        response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
        return false;
    }
    if(post.lname == undefined || post.lname == null || post.lname == ''){
        response.json({state:false, mensaje:"Dato Apellido es obligatorio"})
        return false;
    }

    if(post.document == undefined || post.document == null || post.document == ''){
        response.json({state:false, mensaje:"Dato document es obligatorio"})
        return false;
    }

    if(post.unitname == undefined || post.unitname == null || post.unitname == ''){
        response.json({state:false, mensaje:"Dato Apartamento es obligatorio"})
        return false;
    }

    if(post.complement == undefined || post.complement == null || post.complement == ''){
        response.json({state:false, mensaje:"Dato Interior de Unidad es obligatorio"})
        return false;
    }

    
    visitantesModel.actualizarvisitante(post, function(resultado){
        response.json(resultado)
    })
        
}

//DELETE
visitantesController.eliminar = function(request,response){
    var post = {
        document:request.body.document
        
    }
    if(post.document == undefined || post.document == null || post.document == ''){
        response.json({state:false, mensaje:"Dato documento es obligatorio"})
        return false;
    }
    visitantesModel.eliminarvisitante(post, function(resultado){
        console.log(resultado)
        response.json(resultado)
                
        })
    }

    module.exports.visitantesController = visitantesController;
