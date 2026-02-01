import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/check-auth').get(verifyJwt, (req, res) => {
   return res.json({ message: "loggin user" })
})
router.route('/logout').post(verifyJwt, logoutUser);

export default router; 