import jwt from "jsonwebtoken";

// ✅ AUTH (check token)
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id + role
    next();
  } catch {
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
