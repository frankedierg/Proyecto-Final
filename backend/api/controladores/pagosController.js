var pagosModel = require('../modelos/pagosModel').pagosModel
var pagosController = {}

pagosController.pagosregistro = function(request,response){

    var nombre = request.body.nombre
    var apellido = request.body.apellido
    var unitname = request.body.unitname
    var complement = request.body.complement
    var paymentdate = request.body.paymentdate
    var monthpayment = request.body.monthpayment
    var file = request.body.file

   //VALIDACIÓN DE LA Pago
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
  
    if(paymentdate == undefined || paymentdate == null || paymentdate == ''){
        response.json({state:false, mensaje:"La fecha de pago es obligatorio"})
        return false;
    }

    if(monthpayment == undefined || monthpayment == null || monthpayment == ''){
        response.json({state:false, mensaje:"el mes de pago es obligatorio"})
        return false;
    }

    if(file == undefined || file == null || file == ''){
        response.json({state:false, mensaje:"El soporte de pago es obligatorio"})
        return false;
    }

       
   var post = {
    nombre:nombre,
    apellido:apellido,
    unitname:unitname,
    complement:complement,
    paymentdate:paymentdate,
    monthpayment: monthpayment,
    file:file
   }

     pagosModel.buscapagos(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"Pago ya existe, por favor intente con otro"})
        return false
    }
    else{
        pagosModel.pagosregistro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Pago registrado Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al guardar'})
            }
                   
        })
   }
   })
}

pagosController.listar = function(request,response){
    var post = {}
    pagosModel.listar(post, function(listapagos){
        response.json({state:true,pagos:listapagos})
    })
}

pagosController.CargarId = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ''){
        response.json({state:false, mensaje:"Dato ID es obligatorio"})
        return false;
    }


    pagosModel.CargarId(post, function(listapagos){
        response.json({state:true,pagos:listapagos})
    })
}

pagosController.actualizar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        unitname:request.body.unitname,
        complement:request.body.complement,
        paymentdate: request.body.paymentdate,
        monthpayment: request.body.monthpayment,
        file:request.body.file        
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
        response.json({state:false, mensaje:"Dato interior de Unidad es obligatorio"})
        return false;
    }
    if(post.paymentdate == undefined || post.paymentdate == null || post.paymentdate == ''){
        response.json({state:false, mensaje:"Fecha de pago es obligatorio"})
        return false;
    }
    if(post.monthpayment == undefined || post.monthpayment == null || post.monthpayment == ''){
        response.json({state:false, mensaje:"Mes de pago es obligatorio"})
        return false;
    }
    if(post.file == undefined || post.file == null || post.file == ''){
        response.json({state:false, mensaje:"El archivo de soporte es obligatorio"})
        return false;
    }
   
    pagosModel.actualizapagos(post, function(resultado){
        response.json(resultado)
    })
        
}

pagosController.eliminar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        unitname:request.body.unitname,
        complement:request.body.complement,
        paymentdate:request.body.paymentdate,
        monthpayment:request.body.monthpayment,
        file:request.body.file       
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
        response.json({state:false, mensaje:"Dato Apartamento es obligatorio"})
        return false;
    }
    if(post.complement == undefined || post.complement == null || post.complement == ''){
        response.json({state:false, mensaje:"Dato Interior de Unidad es obligatorio"})
        return false;
    }
    if(post.paymentdate == undefined || post.paymentdate == null || post.paymentdate == ''){
        response.json({state:false, mensaje:"Dato Fecha de pago es obligatorio"})
        return false;
    }
    if(post.monthpayment == undefined || post.monthpayment == null || post.monthpayment == ''){
        response.json({state:false, mensaje:"El mes a pagar es obligatorio"})
        return false;
    }
    if(post.file == undefined || post.file == null || post.file == ''){
        response.json({state:false, mensaje:"El compribante de pago  es obligatorio"})
        return false;
    }
    
    pagosModel.eliminapagos(post, function(resultado){
        console.log(resultado)
        response.json(resultado)
                
        })
    }





module.exports.pagosController = pagosController;