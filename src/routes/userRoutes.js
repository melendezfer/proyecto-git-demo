import { getUsers, createUser } from "../controllers/userController.js";

export function userRoutes(req, res, body) {
  if (req.url === "/users" && req.method === "GET") {
    getUsers(req, res);
    return true;
  }

  if (req.url === "/users" && req.method === "POST") {
    createUser(req, res, body);
    return true;
  }

  return false;
}
