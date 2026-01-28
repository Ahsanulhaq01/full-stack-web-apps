import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createRecipe , getRecipes } from "../controllers/recipe.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();


router.route('/upload-recipe').post(
    verifyJwt,
    upload.fields([
        {
            name : 'recipeImage',
            maxCount :1,
        },
    ]),
    createRecipe
)

router.route('/recipes').get(getRecipes)

export default router;