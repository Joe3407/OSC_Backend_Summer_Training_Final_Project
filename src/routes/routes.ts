import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { createbooking, cancelbooking } from "../controllers/booking.controller";
import { createclass, deleteclass, getclasses, getclassbyid, updateclass } from "../controllers/class.controllers";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorizeMember } from "../middlewares/authorizeMember.middleware";
import { authorizeTrainer } from "../middlewares/authorizeTrainer.middleware";
import { ValidateData, ValidateClassSessionData, ValidateBookingData } from "../middlewares/validate.middleware";

const router = Router();

router.post("/register", ValidateData, register);
router.post("/login", login);

router.post("/classes", authenticate, authorizeTrainer, ValidateClassSessionData, createclass);
router.get("/classes", authenticate, authorizeMember, getclasses);
router.get("/classes/:id", authenticate, authorizeMember, getclassbyid);
router.put("/classes/:id", authenticate, authorizeTrainer, ValidateClassSessionData, updateclass);
router.delete("/classes/:id", authenticate, authorizeTrainer, deleteclass);

router.post("/bookings", authenticate, authorizeMember, createbooking);
router.patch("/bookings/:id/cancel", authenticate, authorizeMember, cancelbooking);

export default router;