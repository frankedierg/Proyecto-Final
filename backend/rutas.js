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
app.post('/unidad/unidadregistro',function(request,response){
      sesiones.unidadregistro(request,response)
   })

  
