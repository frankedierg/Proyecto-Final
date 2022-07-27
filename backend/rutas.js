const { sesionesController } = require('./api/controladores/sesionesController')

var sesiones = require('./api/controladores/sesionesController').sesionesController
var unidades = require('./api/controladores/unidadesController').unidadesController
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
app.post('/visitantes/eliminar',function(request,response){
      unidades.eliminar(request,response)
})


//ENVÍO DE CORREOS
app.post('/usuarios/emailing',function(request,response){
      visitantes.emailing(request,response)
   })
//REGISTRO DE VISITANTES
   app.post('/visitantes/registro',function(request,response){
      visitantes.registro(request,response)
   })
  
   app.post('/visitantes/listar',function(request,response){
         visitantes.listar(request,response)
   })
   
   app.post('/visitantes/CargarId',function(request,response){
      visitantes.CargarId(request,response)
   })
   app.post('/visitantes/actualizar',function(request,response){
         sesiones.actualizar(request,response)
   })
   app.post('/visitantes/eliminar',function(request,response){
         visitantes.eliminar(request,response)
   })
