import express from "express";
import routes from "./routes/api/index.js"; // or just "./routes" if you re-exported correctly
import connectDB from "./config/connection.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount API routes at /api
app.use("/api", routes);

// Connect to Mongo and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
