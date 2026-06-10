import { Router } from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyjwt, getNotifications);
router.patch("/mark-as-read", verifyjwt, markAsRead);

export default router;
