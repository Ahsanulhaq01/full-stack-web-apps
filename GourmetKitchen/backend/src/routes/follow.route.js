import { Router } from "express";
import { followUser , getFollowersCount , getFollowingCount } from "../controllers/follow.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";


const router = Router();


router.post("/follow/:id", verifyjwt, followUser);

router.get("/followers/:id", getFollowersCount);
router.get("/following/:id", getFollowingCount);


export default router;