'use strict'
function include(file) {
 
  let script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}

//Incluimos el objeto Socio necesario para la aplicacion
include('../model/Carta.js');

const marcador={
  intentos:0,
  aciertos:0,
  fallos:0,

  inicializar:function(){
    this.intentos=0;
    this.aciertos=0;
    this.fallos=0;
    $('#aciertosId').text(this.aciertos);
    $('#fallosId').text(this.fallos);
    $('#intentosId').text(this.intentos);
  }
}

const tablero={
  listaCartas:[],

  anadirCarta:function(carta){
    if(carta instanceof Carta){
      this.listaCartas.push(carta);
      this.listaCartas.push(carta);
    }
  },

  generarTablero:function(){
    this.listaCartas = this.listaCartas.sort(function() {return Math.random() - 0.5});
    var tableroHtml = document.getElementById("tablero");
    for (var i =0;i<this.listaCartas.length;i++){
      tableroHtml.innerHTML +=this.listaCartas[i].render(i);
    }
    eventoClicCarta();
  }

}


// ------------------- MAIN ------------------------
$(document).ready(function(){
  if($.cookie("usuario")=='' ||$.cookie("usuario")==undefined){
    window.location.href = '../index.html'
  }
  $("#modalGenerarTablero").modal();
  marcador.inicializar();

  $('#btn-salir').on('click', function(){
    $.removeCookie("usuario") 
    window.location.href = '../index.html'
  })

  $('#btn-tablero').on('click', function(){
    if (marcador.aciertos!= tablero.listaCartas.length/2){
      $('#modalGenerarTablero').modal('hide');
      document.getElementById("tablero").innerHTML="";
      marcador.inicializar()
      tablero.generarTablero()
    }
  })
 
  $('#usuarioId').text($.cookie("usuario"))

});

function eventoClicCarta(){
  $(".carta").on('click', function(event){
    if(!$(event.currentTarget).hasClass("acertado")){
      if($(event.currentTarget).hasClass("active")){
        $(event.currentTarget).removeClass("active")
      }else{
        $(event.currentTarget).addClass("active")
       
        var objects = document.getElementsByClassName("active");
        if(objects.length==2){
          marcador.intentos+=1;
          $('#intentosId').text( marcador.intentos);
              
          if(tablero.listaCartas[objects[0].dataset.targetId]==tablero.listaCartas[objects[1].dataset.targetId]){
            var objects = document.getElementsByClassName("active");
            objects[1].firstElementChild.src=tablero.listaCartas[objects[0].dataset.targetId].imagen;
            objects[0].firstElementChild.src=tablero.listaCartas[objects[0].dataset.targetId].imagen;
            objects[1].classList.add("acertado");
            objects[1].classList.remove("active");
             
            objects[0].classList.add("acertado");
            objects[0].classList.remove("active");
            
            marcador.aciertos+=1;
            $('#aciertosId').text(marcador.aciertos);
          
          }else{
            mostrar(objects[1],objects[0]);
            marcador.fallos+=1;
          $('#fallosId').text(marcador.fallos);
            objects[1].classList.remove("active");
            objects[0].classList.remove("active");
          
          }
        }
      }
    }
    console.log($(event.currentTarget).hasClass("active"))
  });
}

function cargarCartasJSON () {
  
  let path = '/model/cartas.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
      response.json().then(data => {
      aniadirCartasInicialesArray(data)
      console.log('Datos', data)
    })
  })
}

function aniadirCartasInicialesArray(data){
  for (var i=0;i<data.length;i++){
    let carta= new Carta(data[i].id,data[i].imagen);
    tablero.anadirCarta(carta);
  }
  tablero.generarTablero();
}

function mostrar(obj1,obj2) {
 
  obj1.firstElementChild.src=tablero.listaCartas[obj1.dataset.targetId].imagen;
  obj2.firstElementChild.src=tablero.listaCartas[obj2.dataset.targetId].imagen;
  setTimeout(() => {
    obj1.firstElementChild.src=tablero.listaCartas[obj1.dataset.targetId].imagen2;
  obj2.firstElementChild.src=tablero.listaCartas[obj2.dataset.targetId].imagen2;
  }, 500);
}
cargarCartasJSON ();
console.log('Acaba el programa')
