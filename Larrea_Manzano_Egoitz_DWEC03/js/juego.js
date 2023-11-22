'use strict'

// ------------------- MAIN ------------------------
$(document).ready(function(){
  var intentos=0;
  var fallos=0;
  var aciertos=0;
if($.cookie("usuario")=='' ||$.cookie("usuario")==undefined){
  window.location.href = '../index.html'
}

$('#salir').on('click', function(){
  $.removeCookie("usuario") 
  window.location.href = '../index.html'
} )
  $('#usuarioId').text($.cookie("usuario"))
// 
  

$(".carta").on('click', function(event,e){
  if(!$(event.currentTarget).hasClass("acertado")){
    if($(event.currentTarget).hasClass("active")){
      $(event.currentTarget).removeClass("active")
    }else{
      $(event.currentTarget).addClass("active")
      //event.currentTarget.dataset.targetId
      var objects = document.getElementsByClassName("active");
      if(objects.length==2){
        intentos+=1;
        $('#intentosId').text(intentos);
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
          aciertos+=1;
          $('#aciertosId').text(aciertos);
         
        }else{
          fallos+=1;
        $('#fallosId').text(fallos);
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


console.log('Acaba el programa')
