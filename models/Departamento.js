const db = require("../config/db");

class Departamento {

  constructor(id, nombre, descripcion, gerenteId = null) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._gerenteId = gerenteId;
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get descripcion() { return this._descripcion; }
  get gerenteId() { return this._gerenteId; }

  set nombre(valor) {
    if (!valor || valor.trim() === "") throw new Error("El nombre del departamento es obligatorio.");
    this._nombre = valor.trim();
  }

  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre,
      descripcion: this._descripcion,
      gerenteId: this._gerenteId,
    };
  }

  toString() {
    return `Departamento [${this._id}]: ${this._nombre}`;
  }

}

module.exports = Departamento;
