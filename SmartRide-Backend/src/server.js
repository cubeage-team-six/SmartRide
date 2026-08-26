const http = require("http");
const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Vehicle Rental API running on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
}

startServer();
