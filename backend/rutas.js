var sesiones = require('./api/controladores/sesionesController').sesionesController
var unidades = require('./api/controladores/unidadesController').unidadesController
var visitantes = require('./api/controladores/visitantesController').visitantesController
var reservas = require('./api/controladores/reservasController').reservasController



//APIS REGISTRO USUARIOS 

var validarperfil = function(request,response,next){
   if(request.session.perfil == 1){
   
      next()

   }
   else{
      response.json({mensaje:"Sin permisos"})
   }
}


app.post('/usuarios/login',function(request,response){
   sesiones.iniciarsesion(request,response)
})

app.post('/usuarios/adminlogin',function(request,response){
   sesiones.adminlogin(request,response)
})
app.post('/usuarios/registro',function(request,response){
   sesiones.registro(request,response)
})
app.post('/usuarios/adminregistro',function(request,response){
   sesiones.adminregistro(request,response)
})
app.post('/usuarios/listar',function(request,response){
      sesiones.listar(request,response)
})

app.post('/usuarios/CargarId',function(request,response){
   sesiones.CargarId(request,response)
})
app.post('/usuarios/actualizar',function(request,response){
      sesiones.actualizar(request,response)
})
app.post('/usuarios/eliminar',function(request,response){
      sesiones.eliminar(request,response)
})

//APIS REGISTRO UNIDAD RESIDENCIAL
app.post('/unidades/unidadregistro',function(request,response){
      unidades.unidadregistro(request,response)
   })
app.post('/unidades/listar',function(request,response){
      unidades.listar(request,response)
})

app.post('/unidades/CargarId',function(request,response){
   unidades.CargarId(request,response)
})
app.post('/unidades/actualizar',function(request,response){
unidades.actualizar(request,response)
})
app.post('/unidades/eliminar',function(request,response){
   unidades.eliminar(request,response)
   })
   



//ENVÍO DE CORREOS
app.post('/usuarios/emailing',function(request,response){
      sesiones.emailing(request,response)
   })
const { request, response, json } = require('express')
//Subir archivos
const multer = require('multer')

app.post('/subir',function(request,response){

    var post = {
        ruta:'/imagenes'
    }

    var upload = multer({
        storage: multer.diskStorage({
           
            destination:function(request,file,callback){
                callback(null,appRoot + post.ruta)
            },
            filename:function(request,file,callback){
                
                callback(null,file.originalname)
            }
        }),
        fileFilter: function(request,file,callback){
            var ext = path.extname(file.originalname)
            console.log(ext)
            if(ext !== '.pdf' && ext !== '.jpg' && ext !== '.gif'  && ext !== '.jpeg' && ext !== '.tif' ){
                return callback({state:false,mensaje:'Solo soporta imagenes'},null)
            }
            callback(null,true)

        }
    }).single('userFile')

    upload(request,response,function(err){
        if(err){
            console.log(err),
            response.json(err)
        }
        else{
            console.log('ok')
            response.json({state:true,mensaje:'Archivo Cargado'})
        }
    })


})

  
//REGISTRO DE VISITANTES
   app.post('/visitantes/registro',function(request,response){
      visitantes.visitanteregistro(request,response)
   })
  
   app.post('/visitantes/listar',function(request,response){
         visitantes.listar(request,response)
   })
   
   app.post('/visitantes/CargarId',function(request,response){
      visitantes.CargarId(request,response)
   })
   app.post('/visitantes/actualizar',function(request,response){
         visitantes.actualizar(request,response)
   })
   app.post('/visitantes/eliminar',function(request,response){
         visitantes.eliminar(request,response)
   })


   //REGISTRO DE RESERVAS
   app.post('/reservas/registro',function(request,response){
      reservas.reservasregistro(request,response)
   })
  
   app.post('/reservas/listar',function(request,response){
         reservas.listar(request,response)
   })
   
   app.post('/reservas/CargarId',function(request,response){
      reservas.CargarId(request,response)
   })
   app.post('/reservas/actualizar',function(request,response){
         reservas.actualizar(request,response)
   })
   app.post('/reservas/eliminar',function(request,response){
         reservas.eliminar(request,response)
   })
   //API PARA IDENTIFICAR SI EL USUARIO ESTA LOGUEADO
   app.post('/status',function(request,response){
      response.json({perfil:request.session})
   })