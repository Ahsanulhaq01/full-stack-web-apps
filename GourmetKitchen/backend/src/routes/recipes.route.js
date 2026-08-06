import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createRecipe, getAllRecipes, getSingleRecipes, countRecipes, getCreatorRecipes, updateRecipe, deleteRecipe } from '../controllers/recipes.controller.js'
import verifyjwt from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create').post(
    upload.fields([
        {
            name: 'recipeImage',
            maxCount: 1,
        }
    ]),
    verifyjwt,
    createRecipe
)


router.route('/recipes').get(getAllRecipes);
router.route('/countRecipes').get(verifyjwt, countRecipes);
router.route('/myRecipes').get(verifyjwt, getCreatorRecipes)
router.route('/:id')
    .get(verifyjwt, getSingleRecipes)
    .delete(verifyjwt, deleteRecipe)
    .patch(
        upload.fields([{ name: 'recipeImage', maxCount: 1 }]),
        verifyjwt,
        updateRecipe
    );
export default router