import { Router } from "express";
import { toggleSaveRecipe, getSavedRecipes, checkSaveStatus } from "../controllers/savedRecipe.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";

const router = Router();

router.post("/toggle-save/:id", verifyjwt, toggleSaveRecipe);
router.get("/saved-recipes", verifyjwt, getSavedRecipes);
router.get("/save-status/:id", verifyjwt, checkSaveStatus);

export default router;
