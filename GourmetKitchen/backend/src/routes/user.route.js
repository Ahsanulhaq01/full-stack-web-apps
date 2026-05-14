import { registerUser ,loginUser, uploadProfileImage, getUser } from "../controllers/user.controller.js";
import { Router } from "express";
import verifyjwt from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/upload-profile-image').patch(verifyjwt ,
    upload.fields([
        {
            name : 'profileImage',
            maxCount : 1
        }
    ]),
    uploadProfileImage
)

router.route('/').get(getUser);

export default router