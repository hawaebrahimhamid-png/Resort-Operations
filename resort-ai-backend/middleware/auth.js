import jwt from "jsonwebtoken";

// ✅ AUTH
export const authMiddleware = (req, res, next) => {
  console.log("SECRET:", process.env.JWT_SECRET);

  const authHeader = req.headers.authorization;
console.log("AUTH HEADER:", req.headers.authorization);
  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ ROLE CHECK
export const isManager = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
