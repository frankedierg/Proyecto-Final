var sesiones = require('./api/controladores/sesionesController').sesionesController
var unidades = require('./api/controladores/unidadesController').unidadesController
var visitantes = require('./api/controladores/visitantesController').visitantesController
var reservas = require('./api/controladores/reservasController').reservasController



//APIS REGISTRO USUARIOS
app.post('/usuarios/login',function(request,response){
   sesiones.iniciarsesion(request,response)
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
//Subir archivos
const multer = require('multer')

app.post('/subir',function(req,res){

   var post1 = {};
   post1.ruta='../backend/archivos'


    var upload = multer({
        storage: multer.diskStorage({
           
            destination:function(req,file,callback){
                callback(null,appRoot + post1.ruta)
            },
            filename:function(req,file,callback){
                
                callback(null,file.originalname)
            }
        }),
        fileFilter: function(request,file,callback){
            var ext = path.extname(file.originalname)
            console.log(ext)
            if(ext !== '.pdf' && ext !== '.jpg' && ext !== '.gif'  && ext !== '.jpeg' && ext !== '.tif' ){
                return callback({state:false,mensaje:'Solo soporta pdf e imagenes'},null)
            }
            callback(null,true)

        }
    }).single('userFile')

    upload(req,res,function(err){
        if(err){
            console.log(err),
            res.json(err)
        }
        else{
            console.log('ok')
            res.json({state:true,mensaje:'Archivo Cargado'})
        }
    })


})

//subir logo
app.post('/subirlogo',function(req,res){

   var post1 = {};
   post1.ruta='../backend/archivos'


    var upload = multer({
        storage: multer.diskStorage({
           
            destination:function(req,file,callback){
                callback(null,appRoot + post1.ruta)
            },
            filename:function(req,file,callback){
                
                callback(null,'logo'+ path.extname(file.originalname))
            }
        }),
        fileFilter: function(request,file,callback){
            var ext = path.extname(file.originalname)
            console.log(ext)
            if( ext !== '.jpg'  ){
                return callback({state:false,mensaje:'Solo soporta imagenes jpg'},null)
            }
            callback(null,true)

        }
    }).single('userFile')

    upload(req,res,function(err){
        if(err){
            console.log(err),
            res.json(err)
        }
        else{
            console.log('ok')
            res.json({state:true,mensaje:'Archivo Cargado'})
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

   //Forgot Password
   