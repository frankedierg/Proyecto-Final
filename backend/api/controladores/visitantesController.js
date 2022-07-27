//CREATE- REGISTRO USUARIOS-RESIDENTES
visitantesController.registro = function(request,response){

    var name = request.body.name
    var lname = request.body.lname
    var document = request.body.document
    var unitname = request.body.unitname
    var complement = request.body.complement
    var vehicle = request.body.vehicle
      //VALIDACIÓN PRIMER NOMBRE
   if(name == undefined || name == null || name == ''){
       response.json({state:false, mensaje:"Dato primer nombre es obligatorio"})
       return false;
   }
   
    //VALIDACIÓN APELLIDO

   if(lname == undefined || lname == null || lname == ''){
       response.json({state:false, mensaje:"Dato Primer Apellido es obligatorio"})
       return false;
   }
   
    

       
   var post = {
    name:name,
    lname: lname,
    document:document,
    unitname:unitname,
    complement:complement
}
visitantesModel.registro(post, function(dato){

    if (dato.state == true) {
        response.json({state:true, mensaje:'Usuario registrado Correctamente'})

    }
    else{
        response.json({state:false, mensaje:'Se presentó un error al guardar'})
    }
           
})

   
}


//READ
visitantesController.listar = function(request,response){
    var post = {}
    visitantesModel.listar(post, function(listarvisitantes){
        response.json({state:true,usuarios:listarvisitantes})
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
        vehicle:request.body.vehicle,
        unitname:request.body.unitname,
        complement:request.body.complement,
        unitcategory:request.body.unitcategory,
        building:request.body.building
        
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

    if(post.vehicle == undefined || post.vehicle == null || post.vehicle == ''){
        response.json({state:false, mensaje:"Dato placa el vehiculo es obligatorio"})
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
