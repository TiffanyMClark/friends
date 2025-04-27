# Social Networking API

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)
- [Features](#features)

## Description

This is a backend API for a social network web application where users can share their thoughts, react to friends' thoughts, and add or remove friends.

## Installation

Node.js,

Express,

MongoDB & Mongoose,

TypeScript,

Faker.js (for seeding),

Clone the Repo,

Seed the Database,

Start the Server

## Tests

API Endpoints
🧑 Users
GET /api/users – Get all users

GET /api/users/:id – Get user by ID (populates thoughts & friends)

POST /api/users – Create a new user

PUT /api/users/:id – Update a user

DELETE /api/users/:id – Delete a user

POST /api/users/:userId/friends/:friendId – Add a friend

DELETE /api/users/:userId/friends/:friendId – Remove a friend

Thoughts

GET /api/thoughts – Get all thoughts

GET /api/thoughts/:id – Get a thought by ID

POST /api/thoughts – Create a thought

PUT /api/thoughts/:id – Update a thought

DELETE /api/thoughts/:id – Delete a thought

POST /api/thoughts/:id/reactions – Add a reaction

DELETE /api/thoughts/:id/reactions/:reactionId – Remove a reaction

Import the provided Insomnia JSON Collection or manually test endpoints with:

POST body examples in JSON

URL parameters using real IDs from database

## license

MIT

## Features

Full CRUD for users and thoughts

Timestamp formatting with getters

## Video/ GitHub

https://github.com/TiffanyMClark/friends

https://app.screencastify.com/v3/watch/Yyo7fYXOMLaGSTpZUtfH
