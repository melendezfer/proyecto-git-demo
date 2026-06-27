import http from "http";
import { handleRoutes } from "./miniRouter.js";
import { userRoutes } from "./routes/userRoutes.js";

userRoutes(); // 🔥 FALTABA ESTO

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const handled = handleRoutes(req, res, body);

    if (handled) return; // 🔥 IMPORTANTE

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  });
});

server.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
