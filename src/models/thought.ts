import { Schema, model } from "mongoose";
import reactionSchema from "./reaction.js"; // Import the Reaction schema
import { formatDate } from "../utils/dateFormat.js"; // Import the date formatting utility
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("Thought", thoughtSchema);

export default Thought;
