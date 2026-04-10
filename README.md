# 🏢 API - Sistema de Gestión de Empresa de Desarrollo

API REST construida con **Node.js** y **Express**, aplicando los principios de **Programación Orientada a Objetos (POO)**. Arquitectura MVC preparada para integración con base de datos MySQL en futuras etapas.

---

## 📁 Estructura del Proyecto

```
api-empresa-desarrollo/
├── app.js                          ← Punto de entrada del servidor
├── package.json                    ← Dependencias y scripts
├── .env.example                    ← Variables de entorno de ejemplo
│
├── config/
│   └── db.js                       ← Conexión a la BD (patrón Singleton)
│
├── models/                         ← Clases de datos (POO)
│   ├── Empleado.js
│   ├── Proyecto.js
│   ├── Cliente.js
│   └── Departamento.js
│
├── controllers/                    ← Lógica del negocio (manejo de requests)
│   ├── EmpleadoController.js
│   ├── ProyectoController.js
│   ├── ClienteController.js
│   └── DepartamentoController.js
│
├── routes/                         ← Definición de endpoints
│   ├── EmpleadoRoutes.js
│   ├── ProyectoRoutes.js
│   ├── ClienteRoutes.js
│   └── DepartamentoRoutes.js
│
└── middlewares/
    └── errorHandler.js             ← Manejo global de errores y rutas 404
```

---

## ⚙️ Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus datos de base de datos:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=empresa_desarrollo
DB_PORT=3306
```

### 3. Iniciar el servidor
```bash
# Producción
npm start

# Desarrollo (con recarga automática)
npm run dev
```

---

## 🔗 Endpoints de la API

### Base URL: `http://localhost:3000`

#### 👤 Empleados — `/api/empleados`
| Método | Endpoint              | Descripción                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/empleados`      | Obtener todos los empleados    |
| GET    | `/api/empleados/:id`  | Obtener un empleado por ID     |
| POST   | `/api/empleados`      | Crear un nuevo empleado        |
| PUT    | `/api/empleados/:id`  | Actualizar un empleado         |
| DELETE | `/api/empleados/:id`  | Eliminar un empleado           |

**Body para POST/PUT:**
```json
{
  "nombre": "Ana García",
  "correo": "ana.garcia@empresa.com",
  "puesto": "Desarrolladora Full Stack",
  "salario": 1500000,
  "departamentoId": 1
}
```

---

#### 📂 Proyectos — `/api/proyectos`
| Método | Endpoint                              | Descripción                       |
|--------|---------------------------------------|-----------------------------------|
| GET    | `/api/proyectos`                      | Obtener todos los proyectos       |
| GET    | `/api/proyectos/:id`                  | Obtener un proyecto por ID        |
| GET    | `/api/proyectos/cliente/:clienteId`   | Proyectos de un cliente           |
| POST   | `/api/proyectos`                      | Crear un nuevo proyecto           |
| PUT    | `/api/proyectos/:id`                  | Actualizar un proyecto            |
| DELETE | `/api/proyectos/:id`                  | Eliminar un proyecto              |

**Body para POST/PUT:**
```json
{
  "nombre": "App de Gestión Interna",
  "descripcion": "Sistema web para control de inventario.",
  "estado": "activo",
  "fechaInicio": "2025-01-15",
  "fechaFin": "2025-06-30",
  "clienteId": 2
}
```
> **Estados válidos:** `activo`, `completado`, `pausado`, `cancelado`

---

#### 🏢 Clientes — `/api/clientes`
| Método | Endpoint             | Descripción                  |
|--------|----------------------|------------------------------|
| GET    | `/api/clientes`      | Obtener todos los clientes   |
| GET    | `/api/clientes/:id`  | Obtener un cliente por ID    |
| POST   | `/api/clientes`      | Crear un nuevo cliente       |
| PUT    | `/api/clientes/:id`  | Actualizar un cliente        |
| DELETE | `/api/clientes/:id`  | Eliminar un cliente          |

**Body para POST/PUT:**
```json
{
  "nombre": "Carlos Mora",
  "correo": "carlos@negocio.com",
  "telefono": "8888-1234",
  "empresa": "Negocio CR S.A."
}
```

---

#### 🏗️ Departamentos — `/api/departamentos`
| Método | Endpoint                   | Descripción                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/departamentos`       | Obtener todos los departamentos  |
| GET    | `/api/departamentos/:id`   | Obtener un departamento por ID   |
| POST   | `/api/departamentos`       | Crear un nuevo departamento      |
| PUT    | `/api/departamentos/:id`   | Actualizar un departamento       |
| DELETE | `/api/departamentos/:id`   | Eliminar un departamento         |

**Body para POST/PUT:**
```json
{
  "nombre": "Desarrollo",
  "descripcion": "Área de desarrollo de software.",
  "gerenteId": 5
}
```

---

## 📐 Principios de POO Aplicados

| Principio         | Implementación                                                                 |
|-------------------|--------------------------------------------------------------------------------|
| **Encapsulamiento** | Atributos privados con `_` y acceso controlado mediante getters/setters       |
| **Abstracción**     | Los modelos ocultan la complejidad de la BD; los controladores ocultan la lógica |
| **Clases**          | Cada entidad (Empleado, Proyecto, etc.) es una clase con su propia responsabilidad |
| **Singleton**       | La conexión a la BD usa patrón Singleton para una única instancia             |

---

## 🗄️ Preparación para Base de Datos

Todos los métodos de acceso a datos están definidos en los modelos con comentarios `// TODO`. Cuando se integre la base de datos, solo se deben descomentar los bloques SQL correspondientes en cada método (`getAll`, `getById`, `create`, `update`, `delete`).

### Tablas esperadas en MySQL:
```sql
CREATE TABLE departamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  gerente_id INT
);

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  puesto VARCHAR(100) NOT NULL,
  salario DECIMAL(12,2) NOT NULL,
  departamento_id INT,
  FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  empresa VARCHAR(150)
);

CREATE TABLE proyectos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  estado ENUM('activo','completado','pausado','cancelado') DEFAULT 'activo',
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

---

## 📦 Dependencias

| Paquete    | Versión  | Uso                            |
|------------|----------|--------------------------------|
| express    | ^4.18.2  | Framework web del servidor     |
| dotenv     | ^16.3.1  | Variables de entorno           |
| mysql2     | ^3.6.1   | Driver para MySQL              |
| cors       | ^2.8.5   | Habilitar peticiones CORS      |
| nodemon    | ^3.0.1   | Recarga automática (dev)       |
