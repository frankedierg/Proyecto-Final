var reservasModel = require('../modelos/reservasModel').reservasModel
var reservasController = {}

reservasController.reservasregistro = function(request,response){

    var nombre = request.body.nombre
    var apellido = request.body.apellido
    var unitname = request.body.unitname
    var complement = request.body.complement
    var initdate = request.body.initdate
    var enddate = request.body.enddate
    var area = request.body.area

   //VALIDACIÓN DE LA RESERVA
   if(nombre == undefined || nombre == null || nombre == ''){
       response.json({state:false, mensaje:"El nombre es obligatorio"})
       return false;
   }
   
   if(apellido == undefined || apellido == null || apellido == ''){
    response.json({state:false, mensaje:"El apellido es obligatorio"})
    return false;
    }

    if(unitname == undefined || unitname == null || unitname == ''){
        response.json({state:false, mensaje:"El número de apartamento es obligatorio"})
        return false;
    }

    if(complement == undefined || complement == null || complement == ''){
        response.json({state:false, mensaje:"El nombre del interior es obligatorio"})
        return false;
    }
  
    if(initdate == undefined || initdate == null || initdate == ''){
        response.json({state:false, mensaje:"La fecha de inicio es obligatorio"})
        return false;
    }

    if(enddate == undefined || enddate == null || enddate == ''){
        response.json({state:false, mensaje:"La fecha final es obligatorio"})
        return false;
    }

    if(area == undefined || area == null || area == ''){
        response.json({state:false, mensaje:"El área común  es obligatorio"})
        return false;
    }

       
   var post = {
    nombre:nombre,
    apellido:apellido,
    unitname:unitname,
    complement:complement,
    initdate:initdate,
    enddate: enddate,
    area:area
   }

     reservasModel.buscareservas(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"Reaserva ya existe, por favor intente con otro"})
        return false
    }
    else{
        reservasModel.reservasregistro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Reserva registrada Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al guardar'})
            }
                   
        })
   }
   })
}

reservasController.listar = function(request,response){
    var post = {}
    reservasModel.listar(post, function(listareservas){
        response.json({state:true,reservas:listareservas})
    })
}

reservasController.CargarId = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ''){
        response.json({state:false, mensaje:"Dato ID es obligatorio"})
        return false;
    }


    reservasModel.CargarId(post, function(listareservas){
        response.json({state:true,reservas:listareservas})
    })
}

reservasController.actualizar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        unitname:request.body.unitname,
        complement:request.body.complement,
        initdate: request.body.initdate,
        enddate: request.body.enddate,
        area:request.body.area        
    }
    
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"Dato nombre es obligatorio"})
        return false;
    }

    if(post.apellido == undefined || post.apellido == null || post.apellido == ''){
        response.json({state:false, mensaje:"Dato apellido es obligatorio"})
        return false;
    }
    if(post.unitname == undefined || post.unitname == null || post.unitname == ''){
        response.json({state:false, mensaje:"Dato nombre de la Unidad es obligatorio"})
        return false;
    }
    if(post.complement == undefined || post.complement == null || post.complement == ''){
        response.json({state:false, mensaje:"Dato Complemento de Unidad es obligatorio"})
        return false;
    }
    if(post.initdate == undefined || post.initdate == null || post.initdate == ''){
        response.json({state:false, mensaje:"Fecha de inicio es obligatorio"})
        return false;
    }
    if(post.enddate == undefined || post.enddate == null || post.enddate == ''){
        response.json({state:false, mensaje:"Fecha final es obligatorio"})
        return false;
    }
    if(post.area == undefined || post.area == null || post.area == ''){
        response.json({state:false, mensaje:"El área es obligatorio"})
        return false;
    }
   
    reservasModel.actualizareservas(post, function(resultado){
        response.json(resultado)
    })
        
}

reservasController.eliminar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        unitname:request.body.unitname,
        complement:request.body.complement,
        initdate:request.body.initdate,
        enddate:request.body.enddate,
        area:request.body.area       
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"Dato nombre es obligatorio"})
        return false;
    }
    if(post.apellido == undefined || post.apellido == null || post.apellido == ''){
        response.json({state:false, mensaje:"Dato Apartamento es obligatorio"})
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
    if(post.initdate == undefined || post.initdate == null || post.initdate == ''){
        response.json({state:false, mensaje:"Dato Fecha de inicio es obligatorio"})
        return false;
    }
    if(post.enddate == undefined || post.enddate == null || post.enddate == ''){
        response.json({state:false, mensaje:"Dato Fecha final es obligatorio"})
        return false;
    }
    if(post.area == undefined || post.area == null || post.area == ''){
        response.json({state:false, mensaje:"Dato area  es obligatorio"})
        return false;
    }
    
    reservasModel.eliminareservas(post, function(resultado){
        console.log(resultado)
        response.json(resultado)
                
        })
    }





module.exports.reservasController = reservasController;