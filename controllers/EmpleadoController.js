const Empleado = require("../models/Empleado");

class EmpleadoController {

  static async getAll(req, res) {
    try {
      const empleados = await Empleado.getAll();
      return res.status(200).json({
        success: true,
        data: empleados.map(e => e.toJSON()),
        total: empleados.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los empleados.",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "El ID debe ser un número válido.",
        });
      }

      const empleado = await Empleado.getById(Number(id));

      if (!empleado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el empleado con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: empleado.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener el empleado.",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, correo, puesto, salario, departamentoId } = req.body;

      if (!nombre || !correo || !puesto || !salario || !departamentoId) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios: nombre, correo, puesto, salario, departamentoId.",
        });
      }

      const nuevoEmpleado = await Empleado.create({
        nombre,
        correo,
        puesto,
        salario,
        departamentoId,
      });

      return res.status(201).json({
        success: true,
        message: "Empleado creado exitosamente.",
        data: nuevoEmpleado.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el empleado.",
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

      const actualizado = await Empleado.update(Number(id), req.body);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el empleado con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Empleado actualizado exitosamente.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el empleado.",
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

      const eliminado = await Empleado.delete(Number(id));

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el empleado con ID ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Empleado con ID ${id} eliminado exitosamente.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el empleado.",
        error: error.message,
      });
    }
  }
}

module.exports = EmpleadoController;
