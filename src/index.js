import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    return res.end(
      JSON.stringify({
        message: "Bienvenido a la API 🚀",
      }),
    );
  }
  if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const user = JSON.parse(body);

      console.log(user);

      res.writeHead(201);

      res.end(
        JSON.stringify({
          message: "Usuario creado",
          user,
        }),
      );
    });
    return;
  }

  if (req.url === "/status" && req.method === "GET") {
    return res.end(
      JSON.stringify({
        status: "ok",
        uptime: process.uptime(),
      }),
    );
  }

  if (req.url === "/users" && req.method === "GET") {
    return res.end(
      JSON.stringify([
        { id: 1, name: "Juan" },
        { id: 2, name: "Maria" },
      ]),
    );
  }

  res.writeHead(404);

  return res.end(
    JSON.stringify({
      error: "Ruta no encontrada",
    }),
  );
});

server.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
