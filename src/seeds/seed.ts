import { faker } from "@faker-js/faker";
import User from "../models/user.js";
import Thought from "../models/thought.js";
import connectDB from "../config/connection.js";

const seedDatabase = async () => {
  try {
    await connectDB();

    // Generate users
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
      });
    }

    const createdUsers = await User.insertMany(users);
    console.log("Users seeded:", createdUsers);

    const thoughts = [];
    for (let i = 0; i < 5; i++) {
      const randomUser = faker.helpers.arrayElement(createdUsers);

      thoughts.push({
        thoughtText: faker.hacker.phrase(),
        username: randomUser.username,
      });
    }

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log("Thoughts seeded:", createdThoughts);

    const reactions = [];
    for (let i = 0; i < 5; i++) {
      const randomThought = faker.helpers.arrayElement(createdThoughts);
      reactions.push({
        reactionBody: faker.hacker.phrase(),
        username: faker.internet.username(),
        thoughtId: randomThought._id,
      });
    }

    for (const reaction of reactions) {
      await Thought.updateOne(
        { _id: reaction.thoughtId },
        { $push: { reactions: reaction } }
      );
    }

    console.log("Reactions seeded!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

seedDatabase()
  .then(() => {
    console.log("Database seeding completed!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error seeding the database:", error);
    process.exit(1);
  });
