import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import { authMiddleware, isManager } from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

// ✅ PROTECTED ROUTES (PUT HERE 👇)

// 🧪 TEST ROUTE (ALL USERS)
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user,
  });
});

// Only manager
app.get("/admin", authMiddleware, isManager, (req, res) => {
  res.json({ message: "Welcome manager" });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
