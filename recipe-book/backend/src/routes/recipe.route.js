import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createRecipe , getRecipes , getRecipesCount ,getMyRecipes } from "../controllers/recipe.controller.js";
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

router.route('/recipes').get(getRecipes);

router.route('/recipe-count').get(verifyJwt,getRecipesCount);
router.route('/myrecipes').get(verifyJwt , getMyRecipes);

export default router;