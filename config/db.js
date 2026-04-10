const mysql = require("mysql2");
require("dotenv").config();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "empresa_desarrollo",
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    Database.instance = this;
  }

  getConnection() {
    return this.connection.promise();
  }

  async testConnection() {
    try {
      const conn = this.getConnection();
      await conn.query("SELECT 1");
      console.log("✅ Conexión a la base de datos establecida correctamente.");
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error.message);
    }
  }
}

const db = new Database();
module.exports = db;
