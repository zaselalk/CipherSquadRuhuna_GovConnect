import debug from "debug";
import app from "../server";
import http from "http";
import sequelize from "../models";

// get port from environment and store in Express
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

const server = http.createServer(app);

/**Connect to a database */
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync models with database (use { alter: true } in development)
    await sequelize.sync();
    console.log("Database models synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

// Start server with database connection
connectToDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const debugServer = debug("govconnect:server");

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debugServer("Listening on " + bind);
}

exports.sequelize = sequelize;
