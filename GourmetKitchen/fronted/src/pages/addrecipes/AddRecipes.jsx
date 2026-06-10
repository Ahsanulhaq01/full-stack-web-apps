import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GiKnifeFork } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineConstruction } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import Navbar from "./../../components/navbar/Navbar";
// import Navbar
import { MdOutlineShoppingBasket } from "react-icons/md";
import "./addRecipes.css";
import useDynamicList from "../../customHook/useDynamicList";
import axiosInstance from "../../utils/axiosInstance";

function AddRecipes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const ingrediants = useDynamicList([""]);
  const preparationStep = useDynamicList([""]);

  //states for input

  const [title , setTitle] = useState("")
  const [description, setDescription] = useState("");
  // const [ingredients, setIngredients] = useState([""]);
  // const [steps, setSteps] = useState([""]);
  const [preparationTime , setPreparationTime] = useState(0)
  const [category , setCategory] = useState("Dessert");
  const [difficulty , setDifficulty] = useState("Easy");
  const [servings , setServings] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchRecipe = async () => {
        try {
          const response = await axiosInstance.get(`/recipes/${id}`);
          const recipe = response.data.data;
          setTitle(recipe.recipeTitle);
          setDescription(recipe.description);
          setPreparationTime(recipe.preparationTime);
          setCategory(recipe.category);
          setDifficulty(recipe.difficulty);
          setServings(recipe.servings);
          ingrediants.setItems(recipe.ingrediant);
          preparationStep.setItems(recipe.preparationStep);
          // For image, we might just show the existing one as a placeholder if needed
          // but we won't set the File object until user uploads a new one.
        } catch (error) {
          toast.error("Failed to load recipe details");
        }
      };
      fetchRecipe();
    }
  }, [id, isEditMode]);

// const [image, setImage] = useState(null);


const handleSubmit = async (e)=>{
  e.preventDefault();

  const formData = new FormData();

  formData.append('recipeTitle' , title)
  formData.append('description' , description)
  formData.append('difficulty' , difficulty)
  formData.append('category' , category)
  formData.append('preparationTime' , preparationTime)
  formData.append('servings' , servings)
  // formData.append('recipeTitle' , title)
  if (image) formData.append('recipeImage' ,image)
  formData.append('ingrediant' , JSON.stringify(ingrediants.items))
  formData.append('preparationStep' , JSON.stringify(preparationStep.items))
  
  try {
    const response = isEditMode 
      ? await axiosInstance.patch(`recipes/${id}`, formData)
      : await axiosInstance.post("recipes/create", formData);
    
    toast.success(response.data.message)
    if (isEditMode) navigate(`/recipe-details/${id}`);
    else navigate("/");

  } catch (error) {
    console.log(error)
    toast.error(error.message);
  }
}


  const handleFileUpload = () => {
    fileRef.current.click();
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <>
      <Navbar />
      <section className="add-recipes-section">
        <div className="add-recipes-container">
          <div className="add-recipes-heading-container">
            <h1 className="add-recipes-heading">Share Your Creation</h1>
            <p className="add-recipes-para">
              Inspire the community with your culinary expertise. Fill in the
              details below to add your masterwork to the GourmetKitchen
              collection.
            </p>
          </div>

          <div className="recipes-upload-container">
            <form onSubmit={handleSubmit}>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="category-and-preparation-time-container">
                    <div className="category-container">
                      <label htmlFor="gategory-field">Category</label>
                      <select id="gategory-field" value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="Dessert">Dessert</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                      </select>
                    </div>

                    <div className="preparation-time">
                      <label htmlFor="prep-time"> Prep Time (Mins) </label>
                      <input type="number" placeholder="45" value={preparationTime} onChange={(e)=> setPreparationTime(e.target.value)}/>
                    </div>
                  </div>
                  <div className="recipe-description">
                    <label htmlFor="description-of-recipe">
                      Short Description
                    </label>
                    <textarea
                      name="recipe_Description"
                      id="description-of-recipe"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                  </div>

                  <div className="recipe-difficulty-and-serving-container">
                    <div className="recipe-difficulty-level">
                      <label htmlFor="difficulty-lvl">Difficulty</label>
                      <select name="difficulty" id="difficulty-lvl" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="Easy">Easy</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advance">Advance</option>
                      </select>
                    </div>
                    <div className="recipe-serving-container">
                      <label htmlFor="servingInput">Servings</label>
                      <input type="number" id="servingInput" placeholder="1" value={servings} onChange={(e)=>setServings(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="add-recipes-ingrediant-container">
                  <div className="ingrediant-heading">
                    <h3>
                      <MdOutlineShoppingBasket
                        size={20}
                        className="ingredient-icon"
                      />
                      Ingredients
                    </h3>

                    <button
                      className="add-new-btn"
                      type="button"
                      onClick={ingrediants.addItem}
                    >
                      <FiPlus size={20} /> Add New
                    </button>
                  </div>
                  <div className="ingrediant-list">
                    <ul>
                      {ingrediants?.items.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            placeholder="name-of-item"
                            value={item}
                            onChange={(e) =>
                              ingrediants.updateItem(index , e.target.value)
                            }
                          />
                          <button
                            className="detete-ingrediant"
                            type="button"
                            onClick={() => ingrediants.removeItem(index)}
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="preparation-steps-container">
                  <div className="preparation-step-heading">
                    <h3>
                      <MdOutlineConstruction size={20} /> Preparation Steps
                    </h3>
                    <button className="add-step-btn" type="button" onClick={preparationStep.addItem}>
                      <FiCheckCircle /> Add Step
                    </button>
                  </div>
                  <div className="list-of-preparation-steps">
                    <ul>

                      {preparationStep?.items.map((item , index)=>(
                             <li key={index}>
                        <div className="step-container">
                          <p>{index +1}</p>
                          <input type="text" value={item}
                          onChange={(e) => preparationStep.updateItem(index , e.target.value)}
                          />

                          <FiX size={20} className="delete-icon" onClick={() => preparationStep.removeItem(index)}/>
                        </div>
                      </li>
                      ))}
                     
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
                  <div
                    className="image-upload-container"
                    onClick={handleFileUpload}
                  >
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      onChange={handleImageChange}
                    />
                    {previewUrl ? (
                      <img src={previewUrl} alt="recipe-image" />
                    ) : (
                      <div className="image-upload-icon-container">
                        <FiUpload size={20} />
                        <p>Drag and drop or click to upload</p>
                        <p>High resolution PNG,JPG(Max 10MB)</p>
                      </div>
                    )}
                  </div>
                  <div className="tips-container">
                    <p>
                      <span>Pro Tip :</span> Natural lighting and a clean
                      background make your food look professional. Top-down
                      shots are great for showing off plating details.{" "}
                    </p>
                  </div>
                </div>
                <button className="publish-recipe-btn" type="submit">
                  <FiUpload size={20} /> {isEditMode ? "Update Masterpiece" : "Publish Masterpiece"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddRecipes;
