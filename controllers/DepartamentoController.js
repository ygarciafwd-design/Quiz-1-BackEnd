const Departamento = require("../models/Departamento");

class DepartamentoController {

  async getAll(req, res) {
    try {
      const departamentos = await Departamento.getAll();
      return res.status(200).json({
        success: true,
        data: departamentos.map(d => d.toJSON()),
        total: departamentos.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los departamentos.",
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

      const departamento = await Departamento.getById(Number(id));
      if (!departamento) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el departamento con ID ${id}.`,
        });
      }

      return res.status(200).json({ success: true, data: departamento.toJSON() });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener el departamento.",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, descripcion, gerenteId } = req.body;

      if (!nombre) {
        return res.status(400).json({
          success: false,
          message: "El campo 'nombre' es obligatorio.",
        });
      }

      const nuevoDepartamento = await Departamento.create({ nombre, descripcion, gerenteId });

      return res.status(201).json({
        success: true,
        message: "Departamento creado exitosamente.",
        data: nuevoDepartamento.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el departamento.",
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

      const actualizado = await Departamento.update(Number(id), req.body);
      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el departamento con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Departamento actualizado exitosamente.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el departamento.",
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

      const eliminado = await Departamento.delete(Number(id));
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el departamento con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Departamento con ID ${id} eliminado exitosamente.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el departamento.",
        error: error.message,
      });
    }
  }
}

module.exports = DepartamentoController;
