'use strict'
// Funcion para agretar ficheros js 
/*function include(file) {
 
  let script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}*/

//Incluimos el objeto Socio necesario para la aplicacion
//include('./model/Socio.js');

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
    if(usuario instanceof Usuarios ){
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
  obtenerSocios:function() {
    let textoAgregar='';
    if(this.listaSocios.length==0){
      textoAgregar='No hay socios dados de alta';
    }
    for(var i=0;i<this.listaSocios.length;i++) {
      textoAgregar+=this.listaSocios[i].toString();
    }
    return textoAgregar;
  },
  
  obtenerUltimoID:function() {
    if(this.listaSocios.length>0) {
      return this.listaSocios.slice(-1)[0].id ; 
    } else {
      return 0;
    }
  }
}

// TODO: array para añadir los socios cuando se cargue el DOM Completo
/*document.addEventListener("DOMContentLoaded", function() {
  cargarSociosJSON();
}); */

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
      console.log(i+" :"+data[i].contraseña);
     // let socio= new Usuario(i,data.socios[i].nombre,data.socios[i].apellido);
     // usuarios.anadirSocio(socio);
    }
   // console.log(socios.listaSocios.length);
  //  TODO: cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array
}
cargarSociosJSON ();
/*
    TODO: Meotodo para capturar los datos del socio introducidor en el formulario

*/
function capturarDatosSocio () {
  // TODO: recoger los el nombre y apellido del HTML
  let nombre=document.getElementById("fnombre").value;
  let apellido=document.getElementById("fapellido").value;
  if(nombre.trim()=='' || apellido.trim()==''){
    alert("Los datos nombre y apellido son obligatorios");
  }else{
    crearSocio(nombre,apellido);
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

/*
TODO: 
    Metodo para crear el ID del socio en funcion del ultimo
    ID que hay en el array de socios
*/
function crearID () { 
   return socios.obtenerUltimoID()+1;
}

// EJERCICIO 2

/*
  TODO: metodo que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/
function pintarListaSocios () {
  //TODO: borramos todo lo que hay en el div
  contenedorEscribirSocios.innerHTML='';
   //TODO: bucle para recorrer y pintar el array de socios
   //TODO: debemos añadir los socios a la pagina web
  contenedorEscribirSocios.innerHTML=socios.obtenerSocios();
}

// ------------------- MAIN ------------------------
$(document).ready(function(){
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
