'use strict'
// Funcion para agretar ficheros js 
function include(file) {
 
  let script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}

//Incluimos el objeto Socio necesario para la aplicacion
include('../model/Usuario.js');


console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------
// capturamos el formulario de introduccion de socios - Ejercicio 1
//const formulario = document.querySelector('#formNombre')
// capturamos el contenedor donde escribiremos los socios - Ejercicio 2

//const contenedorEscribirSocios = document.getElementById(
//  'contenedorPintarSocios'
//)

const usuarios = {
  listaUsuarios : [],

  //Añade un socio a la lista
  anadirUsuario:function(usuario) {
    //Comprobamos si el dato pasado es del tipo Socio
    if(usuario instanceof Usuario ){
      /*let existe=false;
      for (var i=0;i<this.listaSocios.length;i++){
        if(this.listaUsuarios[i].nombre.trim().toUpperCase()==usuario.nombre.trim().toUpperCase() 
            &&  this.listaUsuarios[i].apellido.trim().toUpperCase()==usuario.apellido.trim().toUpperCase()){
          existe=true;
          break;
        }
      }
      if(!existe){*/
        this.listaUsuarios.push(usuario);
     /* }else{
        alert("Socio ya dado de alta")
      }*/
    } else {
      console.log("Se ha intentado agregar un datos que no es de tipo Usuario")
    }
  },
  //Encadena y retorna la lista de socios 
  usuarioValido:function(usuario,clave) {
    for(var i=0;i<this.listaUsuarios.length;i++) {
      if(this.listaUsuarios[i].usuario==usuario){
        if(this.listaUsuarios[i].esContrasenaValida(clave)){
          return true;
        }else{
          return false;
        }
      }
   
    }
    return false;
  },

}
// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarSociosJSON () {
  console.log("entra");
  let path = 'model/usuarios.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
      response.json().then(data => {
      aniadirUsuarioInicialesArray(data)
      console.log('Datos', data)
    })
  })
}

/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
function aniadirUsuarioInicialesArray(data) {
    console.log('socios', data);
    for( var i=0;(data!==undefined) && (i< data.length) ;i++){
      console.log(i+" :"+data[i].id+" "+data[i].nombre+" "+data[i].apellido+" "+data[i].usuario+" "+ data[i].contraseña);
      let socio= new Usuario(data[i].id,data[i].nombre,data[i].apellido,data[i].usuario,data[i].contraseña);
      usuarios.anadirUsuario(socio);
    }
}

/*
    TODO: Meotodo para capturar los datos del socio introducidor en el formulario

*/
function capturarDatosSocio () {
  // TODO: recoger los el nombre y apellido del HTML
  let usuario=document.getElementById("usuarioID").value;
  let clave=document.getElementById("claveID").value;
  if(usuario.trim()=='' || clave.trim()==''){
    alert("Los datos nombre y apellido son obligatorios");
  }else{
   if(usuarios.usuarioValido(usuario,clave)){
    return true;
   }else{
    return false;
   }
  }
  // TODO: crear el socio y añadirlo al array
}

/* 
TODO: 
    Metodo para crear un socio pasandole el nombre y el apellido
    y añadirlo al array
 */
function crearUsuario (nombre, apellido) {
  // TODO: crear objeto socio
  let usuario= new Usuario(crearID (),nombre,apellido);
  // TODO: añadir el objeto al array
  usuarios.anadirSocio(usuario);
}

// ------------------- MAIN ------------------------
$(document).ready(function(){
  $.removeCookie("usuario") 
  cargarSociosJSON();
  $("#formLogin").on('submit', function(event,e){
    event.preventDefault(); 
    if(capturarDatosSocio ()){
      $.cookie("usuario", "Egoitz Larrea"); 
      window.location.href = '/vista/juego.html';
    }
  })

	$(".carta").on('click', function(event,e){
    if(!$(event.currentTarget).hasClass("acertado")){
      if($(event.currentTarget).hasClass("active")){
        $(event.currentTarget).removeClass("active")
      }else{
        $(event.currentTarget).addClass("active")
        //event.currentTarget.dataset.targetId
        var objects = document.getElementsByClassName("active");
        if(objects.length==2){
          if(objects[0].dataset.targetId==objects[1].dataset.targetId){
            var objects = document.getElementsByClassName("active");
            objects[1].classList.add("acertado");
            objects[1].classList.remove("active");
            
    
            //objects[1].classList.add("acertado");
            objects[0].classList.add("acertado");
            objects[0].classList.remove("active");
           
            //objects[0].classList;
           // $(event.currentTarget).remove("active")
            //$(event.currentTarget).addClass("acertado")
          
           
          }else{
            objects[1].classList.remove("active");
            objects[0].classList.remove("active");
           
          }
         
        
         
        
          
        }
      }
    }
    
    console.log($(event.currentTarget).hasClass("active"))
    //(... rest of your JS code)
  });
});
// TODO: añadimos los socios iniciales cuando empieza el programa

console.log('Acaba el programa')
