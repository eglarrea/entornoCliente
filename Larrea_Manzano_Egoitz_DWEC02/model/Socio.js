'use strict'
// Clase Socio
class Socio {
  constructor(id,nombre,apellido) {
      this.id=id;
      this.nombre=nombre;
      this.apellido=apellido;
  }
  toString() {
    return "<br>Socio numero "+this.id +": "+ this.nombre+" "+this.apellido+"<br>";
  }
}
