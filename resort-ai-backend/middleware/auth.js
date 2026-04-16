import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
   console.log("SECRET:", process.env.JWT_SECRET);
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  // ✅ Check format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
// ✅ ROLE CHECK (manager only)
export const isManager = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
