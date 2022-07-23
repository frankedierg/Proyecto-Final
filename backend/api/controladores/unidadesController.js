var unidadesModel = require('../modelos/unidadesModel').unidadesModel
var unidadesController = {}

unidadesController.unidadregistro = function(request,response){

    var unitname = request.body.unitname
    var complement = request.body.complement
    var unitcategory = request.body.unitcategory
    var buildingname = request.body.buildingname
   console.log(unitname)
   console.log(unitcategory)
   console.log(buildingname)

   //VALIDACIÓN NOMBRE DE LA UNIDAD RESIDENCIAL
   if(unitname == undefined || unitname == null || unitname == ''){
       response.json({state:false, mensaje:"El nombre de la unidad es obligatorio"})
       return false;
   }
   if(unitname.length <=2){
       response.json({state:false, mensaje:"El campo nombre  de la unidad debe ser superior a 2 caracteres"})
       return false;
   }
   if(unitname.length >=30){
       response.json({state:false, mensaje:"El campo nombre de la unidad debe ser inferior a 30 caracteres"})
       return false;
   }
  
    //VALIDACIÓN CATEGORIA DE LA UNIDAD

   if(unitcategory == undefined || unitcategory == null || unitcategory == ''){
       response.json({state:false, mensaje:"Campo categoría es obligatorio"})
       return false;
   }
   if(unitcategory.length <=2){
       response.json({state:false, mensaje:"El campo categoría debe ser superior a 2 caracteres"})
       return false;
   }
   if(unitcategory.length >=30){
       response.json({state:false, mensaje:"El campo categoría debe ser inferior a 30 caracteres"})
       return false;
   }
   
    //VALIDACIÓN NOMBRE DEL CONJUNTO RESIDENCIAL 

    if(buildingname == undefined || buildingname == null || buildingname == ''){
        response.json({state:false, mensaje:"Campo Nombre de Edificio es obligatorio"})
        return false;
    }
    if(buildingname.length <=2){
        response.json({state:false, mensaje:"El campo Nombre de Edificio debe ser superior a 2 caracteres"})
        return false;
    }
    if(buildingname.length >=30){
        response.json({state:false, mensaje:"El campo Nombre de Edificio debe ser inferior a 30 caracteres"})
        return false;
    }
   

       
   var post = {
    unitname:unitname,
    complement:complement,
    unitcategory:unitcategory,
    buildingname:buildingname    
   }

     unidadesModel.buscarunidad(post,function(existe){
        
    if (existe == true) {
        response.json({state:false, mensaje:"Unidad ya existe, por favor intente con otro"})
        return false
    }
    else{
        unidadesModel.unidadregistro(post, function(dato){

            if (dato.state == true) {
                response.json({state:true, mensaje:'Unidad registrado Correctamente'})

            }
            else{
                response.json({state:false, mensaje:'Se presentó un error al guardar'})
            }
                   
        })
   }
   })
}


module.exports.unidadesController = unidadesController;