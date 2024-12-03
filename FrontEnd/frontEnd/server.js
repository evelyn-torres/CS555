import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Seed MongoDB with a default user if none exists
const seedDatabase = async () => {
  const usersCount = await User.countDocuments();
  if (usersCount === 0) {
    await User.create({ username: "testUser", password: "testPassword" });
    console.log("Seeded database with default user.");
  }
};
seedDatabase();

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received:", username, password);
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Login successful" });
      console.log("Login successful");
    } else {
      res.status(401).json({ message: "Invalid credentials" });
      console.log("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("Welcome to the backend server");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

