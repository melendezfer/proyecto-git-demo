import http from "http";
import { userRoutes } from "./routes/userRoutes.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const handled = userRoutes(req, res, body);

    if (!handled) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "Ruta no encontrada",
        }),
      );
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
