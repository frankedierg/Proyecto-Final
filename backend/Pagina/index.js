var Peticion = function(tipo,url,payload,callback){

    var xhr = new XMLHttpRequest 
    xhr.open(tipo, url) 
    if (tipo == "GET") {
        xhr.send()                
    }
    else{
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(payload))
    }

    xhr.addEventListener("readystatechange", function(){
        if(this.readyState===4){
        return callback(JSON.parse(this.responseText))       
        }
    })
}

var registrar = function(){
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var confirmar = document.getElementById('confirmar').value
    

            
        var post = {
            tipo: "POST",
            url: "http://localhost:3000/usuarios/registro",
            payload: {
            fname:fname,
            lname:lname,
            email:email,
            password:password,
            confirmar:confirmar
            }
        }

        if (fname == undefined || fname == null || fname == '' ) {
            console.log("el nombre es obligatorio")
            return false;
        }

            
        Peticion(post.tipo,post.url,post.payload,function(respuesta){
            console.log(respuesta)
            if (respuesta.state == true) {
               // window.location.assign('http://localhost:3000')
                
                
            }
        })


}