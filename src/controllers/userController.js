import { users } from "../data/users.js";

export function getUsers(req, res) {
  res.end(JSON.stringify(users));
}

export function createUser(req, res, body) {
  try {
    const data = JSON.parse(body);

    if (!data.name) {
      res.writeHead(400);
      return res.end(
        JSON.stringify({
          error: "El campo 'name' es obligatorio",
        }),
      );
    }

    const newUser = {
      id: users.length + 1,
      name: data.name,
    };

    users.push(newUser);

    res.writeHead(201);
    return res.end(
      JSON.stringify({
        message: "Usuario creado",
        user: newUser,
      }),
    );
  } catch {
    res.writeHead(400);
    return res.end(
      JSON.stringify({
        error: "JSON inválido",
      }),
    );
  }
}
