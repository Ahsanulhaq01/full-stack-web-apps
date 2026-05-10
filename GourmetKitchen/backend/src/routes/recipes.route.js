import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {createRecipe , getAllRecipes ,getSingleRecipes} from '../controllers/recipes.controller.js'

const router = Router();

router.route('/create').post(
    upload.fields([
        {
            name : 'recipeImage',
            maxCount : 1,
        }
    ]),
    createRecipe
)


router.route('/recipes').get(getAllRecipes);
router.route('/:id').get(getSingleRecipes);
export default router