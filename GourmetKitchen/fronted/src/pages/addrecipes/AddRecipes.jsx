import { GiKnifeFork } from "react-icons/gi";
// import { GiFruitBowl } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineConstruction } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import Navbar from './../../components/navbar/Navbar'
// import Navbar
import { MdOutlineShoppingBasket } from "react-icons/md";



import "./addRecipes.css";

function AddRecipes() {

  const handleConsole = ()=>{
    console.log('hello pakistan');
    
  }
  return (
    <>
      <Navbar/>
      <section className="add-recipes-section">
        <div className="add-recipes-container">
          <div className="add-recipes-heading-container">
            <h1 className="add-recipes-heading">
              Share Your Creation
            </h1>
            <p className="add-recipes-para">
              Inspire the community with your culinary expertise. Fill in the
              details below to add your masterwork to the GourmetKitchen
              collection.
            </p>
          </div>

          <div className="recipes-upload-container">
            <div className="recipe-essential-instruction-ingrediant-container">
              <div className="inputs-and-heading-container">

             
              <h2 className="heading">
                <GiKnifeFork size={20} />
                 Recipe Essentials
              </h2>
              <div className="recipe-title-container">
                <label htmlFor="recipe-title">Recipe Title</label>
                <input
                  type="text"
                  placeholder="e.g Truffle Infused Wild Mushroom Risotta"
                  id="recipe-title"
                />
              </div>

              <div className="category-and-preparation-time-container">
                <div className="category-container">
                  <label htmlFor="gategory-field">Category</label>
                  <select id="gategory-field">
                    <option value="Dessert">Dessert</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                  </select>
                </div>

                <div className="preparation-time">
                  <label htmlFor="prep-time"> Prep Time (Mins) </label>
                  <input type="number" placeholder="45" />
                </div>
              </div>
              <div className="recipe-description">
                <label htmlFor="description-of-recipe">Short Description</label>
                <textarea name="recipe_Description" id="description-of-recipe">
                  hello ahsan
                </textarea>
              </div>
               </div>
              <div className="ingrediant-container">
                <div className="ingrediant-heading">
                  <h3>
                    
<MdOutlineShoppingBasket size={20} className="ingredient-icon"/> Ingredients
                  </h3>

                  <button className="add-new-btn">
                    <FiPlus size={20} /> Add New
                  </button>
                </div>
                <div className="ingrediant-list">
                    <ul>
                      <li>
                        <input type="text" placeholder="name-of-item" />
                        <button className="detete-ingrediant">
                          <FiTrash2 size={20} />
                        </button>
                      </li>
                      <li>
                        <input type="text" placeholder="name-of-item" />
                        <button className="detete-ingrediant">
                          <FiTrash2 size={20} />
                        </button>
                      </li>
                      <li>
                        <input type="text" placeholder="name-of-item" />
                        <button className="detete-ingrediant">
                          <FiTrash2 size={20} />
                        </button>
                      </li>
                    </ul>
                </div>
              </div>

              <div className="preparation-steps-container">
                <div className="preparation-step-heading">
                  <h3>
                    <MdOutlineConstruction size={20} /> Preparation Steps
                  </h3>
                  <button className="add-step-btn">
                    <FiCheckCircle /> Add Step
                  </button>
                </div>
                <div className="list-of-preparation-steps">
                  <ul>
                    <li>
                      <div className="step-container">
                        <p>1</p>
                        <input type="text" />

                        <FiX size={20} className="delete-icon"  />
                      </div>
                    </li>
                    <li>
                      <div className="step-container">
                        <p>1</p>
                        <input type="text" />

                        <FiX size={20} className="delete-icon"  />
                      </div>
                    </li>
                    <li>
                      <div className="step-container">
                        <p>1</p>
                        <input type="text" />

                        <FiX size={20} className="delete-icon" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="image-and-tag-container">
              <div className="image-container">
                <h2>
                  <FiCamera size={20} />
                  Recipe Photo
                </h2>
                <div className="image-upload-container" onClick={handleConsole}>
                  <FiUpload size={20} />
                  <p>Drag and drop or click to upload</p>
                  <p>High resolution PNG,JPG(Max 10MB)</p>
                </div>
                <div className="tips-container">
                  <p>
                    <span>Pro Tip :</span> Natural lighting and a clean
                    background make your food look professional. Top-down shots
                    are great for showing off plating details.{" "}
                  </p>
                </div>
              </div>
              <button className="publish-recipe-btn">
                <FiUpload size={20} /> publish Publish Masterpiece{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddRecipes;
