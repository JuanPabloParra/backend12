const express = require("express");
require("dotenv").config();
const { dbConnection } = require("../database/config");
const cors = require("cors");
const { socketController } = require("../sockets/controller");
const { swaggerDocs } = require("../swagger");

class Server {
  constructor() {
    this.headers = {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      },
    };

    // Crear Express APP
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server, this.headers);

    this.paths = {
      auth: "/api/auth",
      doc: "/",
      task: "/api/task",
    };

    this.connectToDB();
    this.addMiddlewares();
    this.setRoutes();
    this.sockets();
  }

  // Conexión a la base de datos
  async connectToDB() {
    await dbConnection();
  }

  addMiddlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
  }

  setRoutes() {
    // Rutas
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.doc, require("../routes/doc"));
    this.app.use(this.paths.task, require("../routes/task"));
    // Carpeta pública
    this.app.use(express.static("public"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
      swaggerDocs(this.app, this.port);
    });
  }
}

module.exports = Server;
