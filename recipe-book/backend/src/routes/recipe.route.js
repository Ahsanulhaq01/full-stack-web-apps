import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createRecipe, getRecipes , getMyRecipes ,getRecipeById ,updateRecipe ,deleteRecipe , recipesLikeAndDislikeCount} from "../controllers/recipe.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();


router.route('/upload-recipe').post(
    verifyJwt,
    upload.fields([
        {
            name: 'recipeImage',
            maxCount: 1,
        },
    ]),
    createRecipe
)

router.route('/recipes').get(getRecipes);
router.route('/recipe/:id').get(getRecipeById)
// router.route('/recipe-count').get(verifyJwt, getRecipesCount);
router.route('/myrecipes').get(verifyJwt, getMyRecipes);
router.route('/recipe/:id').put(verifyJwt ,upload.single("recipeImage"),updateRecipe);
router.route('/recipe/:id').delete(verifyJwt , deleteRecipe);
router.route('/recipe/:id/react').post(verifyJwt , recipesLikeAndDislikeCount)


export default router;