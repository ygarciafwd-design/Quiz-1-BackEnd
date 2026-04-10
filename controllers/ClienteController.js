const Cliente = require("../models/Cliente");

/**
 * Controlador para operaciones CRUD de clientes.
 * Implementa los métodos estáticos que serán llamados por las rutas.
 */
class ClienteController {

  static async getAll(req, res) {
    try {
      const clientes = await Cliente.getAll();
      return res.status(200).json({
        success: true,
        data: clientes.map(c => c.toJSON()),
        total: clientes.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los clientes.",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "El ID debe ser un número válido." });
      }

      const cliente = await Cliente.getById(Number(id));
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el cliente con ID ${id}.`,
        });
      }

      return res.status(200).json({ success: true, data: cliente.toJSON() });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener el cliente.",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, correo, telefono, empresa } = req.body;

      if (!nombre || !correo || !telefono) {
        return res.status(400).json({
          success: false,
          message: "Campos obligatorios: nombre, correo, telefono.",
        });
      }

      const nuevoCliente = await Cliente.create({ nombre, correo, telefono, empresa });

      return res.status(201).json({
        success: true,
        message: "Cliente creado exitosamente.",
        data: nuevoCliente.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el cliente.",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "El ID debe ser un número válido." });
      }

      const actualizado = await Cliente.update(Number(id), req.body);
      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el cliente con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cliente actualizado exitosamente.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el cliente.",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "El ID debe ser un número válido." });
      }

      const eliminado = await Cliente.delete(Number(id));
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el cliente con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Cliente con ID ${id} eliminado exitosamente.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el cliente.",
        error: error.message,
      });
    }
  }
}

module.exports = ClienteController;
