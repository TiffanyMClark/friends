import { Request, Response } from "express";
import User from "../models/user.js";

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single user
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// POST create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// PUT update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user and their thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User and associated thoughts deleted" });
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
