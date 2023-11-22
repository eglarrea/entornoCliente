'use strict'

// ------------------- MAIN ------------------------
$(document).ready(function(){
  if($.cookie("usuario")=='' ||$.cookie("usuario")==undefined){
    window.location.href = '../index.html'
  }
$('#salir').on('click', function(){
  $.removeCookie("usuario") 
  window.location.href = '../index.html'
} )
  $('#usuarioId').text($.cookie("usuario"))
// 
    //(... rest of your JS code)
});

// TODO: añadimos los socios iniciales cuando empieza el programa

console.log('Acaba el programa')
