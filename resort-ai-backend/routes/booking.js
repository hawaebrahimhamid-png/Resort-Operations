import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// CREATE booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { guestName, roomType, checkIn, checkOut } = req.body;

    const booking = await prisma.booking.create({
      data: {
        guestName,
        roomType,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        userId: req.user.id,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all bookings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
