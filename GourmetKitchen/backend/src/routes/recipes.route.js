import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {createRecipe} from '../controllers/recipes.controller.js'

const router = Router();

router.route('/upload-img').post(
    upload.fields([
        {
            name : 'recipeImage',
            maxCount : 1,
        }
    ]),
    createRecipe
)

export default router