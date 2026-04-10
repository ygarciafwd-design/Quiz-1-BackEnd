const db = require("../config/db");

class Cliente {

  constructor(id, nombre, correo, telefono, empresa = null) {
    this._id = id;
    this._nombre = nombre;
    this._correo = correo;
    this._telefono = telefono;
    this._empresa = empresa;
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get correo() { return this._correo; }
  get telefono() { return this._telefono; }
  get empresa() { return this._empresa; }

  set correo(valor) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) throw new Error("El correo del cliente no es válido.");
    this._correo = valor.toLowerCase();
  }

  set nombre(valor) {
    if (!valor || valor.trim() === "") throw new Error("El nombre del cliente es obligatorio.");
    this._nombre = valor.trim();
  }

  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre,
      correo: this._correo,
      telefono: this._telefono,
      empresa: this._empresa,
    };
  }

  toString() {
    return `Cliente [${this._id}]: ${this._nombre}${this._empresa ? ` (${this._empresa})` : ""}`;
  }

  static async getAll() {

    throw new Error("Método pendiente de implementación con base de datos.");
  }

  static async getById(id) {

    throw new Error("Método pendiente de implementación con base de datos.");
  }

  static async create(datos) {

    throw new Error("Método pendiente de implementación con base de datos.");
  }

  static async update(id, datos) {

    throw new Error("Método pendiente de implementación con base de datos.");
  }

  static async delete(id) {

    throw new Error("Método pendiente de implementación con base de datos.");
  }
}

module.exports = Cliente;
