const Proyecto = require("../models/Proyecto");

class ProyectoController {

  static async getAll(req, res) {
    try {
      const proyectos = await Proyecto.getAll();
      return res.status(200).json({
        success: true,
        data: proyectos.map(p => p.toJSON()),
        total: proyectos.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los proyectos.",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID inválido." });
      }

      const proyecto = await Proyecto.getById(Number(id));
      if (!proyecto) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el proyecto con ID ${id}.`,
        });
      }

      return res.status(200).json({ success: true, data: proyecto.toJSON() });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al obtener el proyecto.", error: error.message });
    }
  }

  static async getByCliente(req, res) {
    try {
      const { clienteId } = req.params;
      if (isNaN(clienteId)) {
        return res.status(400).json({ success: false, message: "ID de cliente inválido." });
      }

      const proyectos = await Proyecto.getByCliente(Number(clienteId));
      return res.status(200).json({
        success: true,
        data: proyectos.map(p => p.toJSON()),
        total: proyectos.length,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al obtener proyectos del cliente.", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, descripcion, estado, fechaInicio, fechaFin, clienteId } = req.body;

      if (!nombre || !estado || !fechaInicio || !clienteId) {
        return res.status(400).json({
          success: false,
          message: "Campos obligatorios: nombre, estado, fechaInicio, clienteId.",
        });
      }

      const estadosValidos = ["activo", "completado", "pausado", "cancelado"];
      if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Use: ${estadosValidos.join(", ")}.`,
        });
      }

      const nuevoProyecto = await Proyecto.create({
        nombre, descripcion, estado, fechaInicio, fechaFin, clienteId,
      });

      return res.status(201).json({
        success: true,
        message: "Proyecto creado exitosamente.",
        data: nuevoProyecto.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al crear el proyecto.", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) return res.status(400).json({ success: false, message: "ID inválido." });

      const actualizado = await Proyecto.update(Number(id), req.body);
      if (!actualizado) {
        return res.status(404).json({ success: false, message: `Proyecto con ID ${id} no encontrado.` });
      }

      return res.status(200).json({ success: true, message: "Proyecto actualizado exitosamente." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al actualizar el proyecto.", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) return res.status(400).json({ success: false, message: "ID inválido." });

      const eliminado = await Proyecto.delete(Number(id));
      if (!eliminado) {
        return res.status(404).json({ success: false, message: `Proyecto con ID ${id} no encontrado.` });
      }

      return res.status(200).json({ success: true, message: `Proyecto con ID ${id} eliminado exitosamente.` });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al eliminar el proyecto.", error: error.message });
    }
  }
}

module.exports = ProyectoController;
