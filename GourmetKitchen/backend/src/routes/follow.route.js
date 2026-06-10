import { Router } from "express";
import { followUser , getFollowersCount , getFollowingCount , unfollowUser , checkFollowStatus } from "../controllers/follow.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";


const router = Router();


router.post("/follow/:id", verifyjwt, followUser);
router.delete("/unfollow/:id", verifyjwt, unfollowUser);
router.get("/status/:id", verifyjwt, checkFollowStatus);

router.get("/followers/:id", getFollowersCount);
router.get("/following/:id", getFollowingCount);


export default router;