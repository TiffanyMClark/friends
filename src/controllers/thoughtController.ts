import { Request, Response } from "express";
import Thought from "../models/thought.js";

// Define types for request bodies and params
interface ThoughtParams {
  id: string;
  reactionId?: string;
}

interface CreateThoughtBody {
  thoughtText: string;
  username: string;
}

interface ReactionBody {
  reactionBody: string;
  username: string;
}

// Get all thoughts
export const getAllThoughts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.status(200).json(thoughts);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to fetch thoughts: ${error.message}` });
  }
};

// Get a thought by ID
export const getThoughtById = async (
  req: Request<ThoughtParams>,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);

    res.status(200).json(thought);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to fetch thought: ${error.message}` });
  }
};

// Create a new thought
export const createThought = async (
  req: Request<{}, {}, CreateThoughtBody>,
  res: Response
): Promise<void> => {
  try {
    const { thoughtText, username } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to create thought: ${error.message}` });
  }
};

// Update a thought
export const updateThought = async (
  req: Request<ThoughtParams>,
  res: Response
): Promise<void> => {
  try {
    const updated = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to update thought: ${error.message}` });
  }
};

// Delete a thought
export const deleteThought = async (
  req: Request<ThoughtParams>,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Thought.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to delete thought: ${error.message}` });
  }
};

// Add a reaction to a thought
export const addReaction = async (
  req: Request<ThoughtParams, {}, ReactionBody>,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true }
    );

    res.status(200).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: `Failed to add reaction: ${error.message}` });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (
  req: Request<ThoughtParams>,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    res.status(200).json(thought);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to remove reaction: ${error.message}` });
  }
};
