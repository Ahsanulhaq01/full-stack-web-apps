import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createRecipe } from "../controllers/recipe.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();


router.route('/upload-recipe').post(
    verifyJwt,
    upload.fields([
        {
            name : 'recipeImg',
            maxCount :1,
        },
    ]),
    createRecipe
)


export default router;