const db = require("../config/db");

class Empleado {

  constructor(id, nombre, correo, puesto, salario, departamentoId) {
    this._id = id;
    this._nombre = nombre;
    this._correo = correo;
    this._puesto = puesto;
    this._salario = salario;
    this._departamentoId = departamentoId;
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get correo() { return this._correo; }
  get puesto() { return this._puesto; }
  get salario() { return this._salario; }
  get departamentoId() { return this._departamentoId; }

  set nombre(valor) {
    if (!valor || valor.trim() === "") throw new Error("El nombre no puede estar vacío.");
    this._nombre = valor.trim();
  }

  set correo(valor) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) throw new Error("El correo electrónico no es válido.");
    this._correo = valor.toLowerCase();
  }

  set salario(valor) {
    if (valor < 0) throw new Error("El salario no puede ser negativo.");
    this._salario = valor;
  }

  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre,
      correo: this._correo,
      puesto: this._puesto,
      salario: this._salario,
      departamentoId: this._departamentoId,
    };
  }

  toString() {
    return `Empleado [${this._id}]: ${this._nombre} - ${this._puesto}`;
  }

}

module.exports = Empleado;
