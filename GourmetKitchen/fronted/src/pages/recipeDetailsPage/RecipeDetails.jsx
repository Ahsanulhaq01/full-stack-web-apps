import { FiClock } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";

import "./recipeDetails.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import useCheckAuth from "../../customHook/useCheckAuth";
import { toast } from "react-toastify";
import useGetUser from "../../customHook/useGetUser";

function RecipeDetails() {
  const [recipe , setRecipe] = useState({});
  const {id} = useParams();
  const [isAuth ] = useCheckAuth(null);
  const [currentUser] = useGetUser();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
 
  useEffect(() => {
    const getRecipeData = async () => {
      try {
        let recipeId = id;

        // If no ID is provided in URL, check localStorage for the last viewed one
        if (!recipeId) {
          recipeId = localStorage.getItem('lastViewedRecipeId');
          
          // If still no ID, fetch the first recipe from the database
          if (!recipeId) {
            const allRecipesResponse = await axiosInstance.get('/recipes/recipes');
            if (allRecipesResponse.data.data && allRecipesResponse.data.data.length > 0) {
              recipeId = allRecipesResponse.data.data[0]._id;
            }
          }

          // If we found an ID (from storage or DB), redirect to it so URL is updated
          if (recipeId) {
            navigate(`/recipe-details/${recipeId}`, { replace: true });
            return;
          } else {
            return; // No recipes available at all
          }
        }

        const recipeResponse = await axiosInstance.get(`/recipes/${recipeId}`);
        const fetchedRecipe = recipeResponse.data.data;
        setRecipe(fetchedRecipe);

        // Save this ID as the last viewed recipe
        if (fetchedRecipe?._id) {
          localStorage.setItem('lastViewedRecipeId', fetchedRecipe._id);
        }

        if (isAuth) {
          const saveStatusResponse = await axiosInstance.get(`/save-status/${recipeId}`);
          setIsSaved(saveStatusResponse.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getRecipeData();
  }, [id, isAuth, navigate]);

  const handleToggleSave = async () => {
    if (!recipe?._id) return;
    try {
      const response = await axiosInstance.post(`/toggle-save/${recipe._id}`);
      toast.success(response.data.message);
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/recipes/${recipe._id}`);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-recipe/${recipe._id}`);
  };

  if(isAuth === false) return <Navigate to={'/login'}/>
  return (
    <>
    <Navbar/>
      <section className="reciep-details-page">
        <div className="image-with-recipe-name-container">
          <img src={recipe.recipeImage} alt="" />
          <div className="recipe-name-and-author-container">
            <h1 className="name-of-recipe">
              {recipe.recipeTitle}
            </h1>
            <div className="creating-time-and-serving-container">
              <span className="creation-time">
                <FiClock size={20} />
                <p>{recipe.preparationTime} min</p>
              </span>
              <span className="serving-container">
                <FiUsers size={20} />
                <p> {recipe.servings} Servings</p>
              </span>
            </div>
            <div className="author-container">
                <p>Recipe By</p>
                <p onClick={()=>{ navigate(`/profile/${recipe.createdBy._id}`)}}>{recipe?.createdBy?.name}</p>
            </div>
            
            <div className="action-buttons-container" style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
              {currentUser?._id === recipe?.createdBy?._id && (
                <div className="creator-actions" style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button className="update-recipe" onClick={handleUpdate} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', background: '#994700', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Update Masterpiece</button>
                  <button className="delete-recipe" onClick={handleDelete} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Delete Masterpiece</button>
                </div>
              )}
              <button className="save-recipe" onClick={handleToggleSave} style={{ width: '100%' }}>
                {isSaved ? "Unsave Recipe" : "Save Recipe"}
              </button>
            </div>
          </div>
        </div>



        <div className="instruction-and-ingrediant-container">
            <div className="ingrediant-container">
                <div className="ingrediant-heading-and-counts">
                    <h2 className="ingrediant-heading">Ingrediant</h2>
                    <p>{recipe.ingrediant?.length} items</p>
                </div>
                <div className="ingrediant-list-container">
                    {recipe.ingrediant?.map((item)=>(
                      <p>{item}</p>
                    ))}
                </div>
            </div>

            <div className="instruction-container">
                <h2 className="instruction-heading">Instruction</h2>
                <div className="instruction-list-container">
                   {recipe.preparationStep?.map((item , index)=>(
                      <div className="single-instruction-and-serialNo">
                        <p>{index+1}</p>
                        <p>{item}</p>
                    </div>
                   )) }
                    
                </div>
            </div>
        </div>
      </section>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Delete Masterpiece?</h3>
            <p>Are you sure you want to delete "{recipe.recipeTitle}"? This culinary creation will be lost forever.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Delete Forever</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
