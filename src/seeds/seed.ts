import { faker } from "@faker-js/faker";
import User from "../models/user"; // Adjust based on your file structure
import Thought from "../models/thought"; // Adjust based on your file structure

const seedDatabase = async () => {
  // Generate users
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }

  // Insert users into the database
  const createdUsers = await User.insertMany(users);
  console.log("Users seeded:", createdUsers);

  // Generate thoughts
  const thoughts = [];
  for (let i = 0; i < 5; i++) {
    const randomUser = faker.helpers.arrayElement(createdUsers);

    thoughts.push({
      thoughtText: faker.hacker.phrase(),
      username: randomUser.username, // Link thought to user
    });
  }

  // Insert thoughts into the database
  const createdThoughts = await Thought.insertMany(thoughts);
  console.log("Thoughts seeded:", createdThoughts);

  // Optionally: Seed reactions if you want to test reactions as well
  // For example, adding reactions for some thoughts

  const reactions = [];
  for (let i = 0; i < 5; i++) {
    const randomThought = faker.helpers.arrayElement(createdThoughts);
    reactions.push({
      reactionBody: faker.hacker.phrase(),
      username: faker.internet.userName(),
      thoughtId: randomThought._id,
    });
  }

  // If you are adding reactions to thoughts
  for (const reaction of reactions) {
    await Thought.updateOne(
      { _id: reaction.thoughtId },
      { $push: { reactions: reaction } }
    );
  }

  console.log("Reactions seeded!");
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
