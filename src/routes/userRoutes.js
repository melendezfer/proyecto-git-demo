import { get, post } from "../miniRouter.js";
import {
  getUsers,
  createUser,
  getUserById,
} from "../controllers/userController.js";

export function userRoutes() {
  get("/users", getUsers);
  get("/users/:id", getUserById);
  post("/users", createUser);
}
