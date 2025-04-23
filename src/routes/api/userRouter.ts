import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getUserById,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

// GET all users
router.get("/", getAllUsers);

// GET/DELETE/PUT user by ID
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

// POST a new user
router.post("/", createUser);

// friend routes
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Export the router
export default router;
