const db = require("../config/db");

class Proyecto {

  constructor(id, nombre, descripcion, estado, fechaInicio, fechaFin, clienteId) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._estado = estado;
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
    this._clienteId = clienteId;
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get descripcion() { return this._descripcion; }
  get estado() { return this._estado; }
  get fechaInicio() { return this._fechaInicio; }
  get fechaFin() { return this._fechaFin; }
  get clienteId() { return this._clienteId; }

  set nombre(valor) {
    if (!valor || valor.trim() === "") throw new Error("El nombre del proyecto es obligatorio.");
    this._nombre = valor.trim();
  }

  set estado(valor) {
    const estadosValidos = ["activo", "completado", "pausado", "cancelado"];
    if (!estadosValidos.includes(valor)) {
      throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(", ")}`);
    }
    this._estado = valor;
  }

  estaActivo() {
    return this._estado === "activo";
  }

  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre,
      descripcion: this._descripcion,
      estado: this._estado,
      fechaInicio: this._fechaInicio,
      fechaFin: this._fechaFin,
      clienteId: this._clienteId,
    };
  }

  toString() {
    return `Proyecto [${this._id}]: ${this._nombre} (${this._estado})`;
  }


}
module.exports = Proyecto;
