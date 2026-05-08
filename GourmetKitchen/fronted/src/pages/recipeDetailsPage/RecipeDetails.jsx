import panSeardeImage from "../../assets/images/Pan-Seared-Duck-Breast.png";
import { FiClock } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";

import "./recipeDetails.css";

function RecipeDetails() {
  return (
    <>
      <section className="reciep-details-page">
        <div className="image-with-recipe-name-container">
          <img src={panSeardeImage} alt="" />
          <div className="recipe-name-and-author-container">
            <h1 className="name-of-recipe">
              Pan-Seared Duck Breast with Raspberry Glaze
            </h1>
            <div className="creating-time-and-serving-container">
              <span className="creation-time">
                <FiClock size={20} />
                <p>45 min</p>
              </span>
              <span className="serving-container">
                <FiUsers size={20} />
                <p> 2 Servings</p>
              </span>
            </div>
            <div className="author-container">
                <p>Recipe By</p>
                <p>ahsanulhaq</p>
            </div>
            <button className="save-recipe">Save Recipe</button>
          </div>
        </div>



        <div className="instruction-and-ingrediant-container">
            <div className="ingrediant-container">
                <div className="ingrediant-heading-and-counts">
                    <h2 className="ingrediant-heading">Ingrediant</h2>
                    <p>8 items</p>
                </div>
                <div className="ingrediant-list-container">
                    <p>2 Duck breasts (approx. 200g each)</p>
                    <p>150g Fresh raspberries</p>
                    <p>2 tbsp Balsamic vinegar</p>
                    <p> 1 tbsp Honey </p>
                </div>
            </div>

            <div className="instruction-container">
                <h2 className="instruction-heading">Instruction</h2>
                <div className="instruction-list-container">
                    <div className="single-instruction-and-serialNo">
                        <p>1</p>
                        <p>Score the fat on the duck breasts in a crosshatch pattern, being careful not to cut into the meat. Season both sides generously with sea salt and freshly ground black pepper.</p>
                    </div>

                    <div className="single-instruction-and-serialNo">
                        <p>2</p>
                        <p>Place the duck breasts skin-side down in a cold pan. Turn the heat to medium and cook for 6-8 minutes until the fat has rendered and the skin is crispy and golden brown.</p>
                    </div>

                    <div className="single-instruction-and-serialNo">
                        <p>3</p>
                        <p>In a separate small saucepan, combine the raspberries, balsamic vinegar, and honey. Simmer over medium heat for 5 minutes, crushing the berries with a spoon until the sauce thickens into a glossy glaze.</p>
                    </div>
                    
                </div>
            </div>
        </div>
      </section>
    </>
  );
}

export default RecipeDetails;
