import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {createRecipe , getAllRecipes ,getSingleRecipes , countRecipes} from '../controllers/recipes.controller.js'
import verifyjwt from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create').post(
    upload.fields([
        {
            name : 'recipeImage',
            maxCount : 1,
        }
    ]),
    verifyjwt,
    createRecipe
)


router.route('/recipes').get(getAllRecipes);
router.route('/countRecipes').get(verifyjwt, countRecipes);
router.route('/:id').get(verifyjwt ,getSingleRecipes);
export default router