import profilePic from "./../../assets/images/imageIcon.png";
import { BsBookmark } from "react-icons/bs";
import { LuUtensils } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import RecipeCard from "./../../components/recipeCard/RecipeCard";
import Navbar from "../../components/navbar/Navbar";
import "./profilePage.css";
import useGetRecipes from "../../customHook/useGetRecipes";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import useGetUser from "../../customHook/useGetUser";
import useCheckAuth from "../../customHook/useCheckAuth";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [recipes] = useGetRecipes([]);
  const [user] = useGetUser([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isAuth , setIsAuth] = useCheckAuth(null)
  const navigate = useNavigate();
 
  async function handleImageChange(e){
      const file = e.target.files[0];

      if(file){
        // setProfileImage(file)

        setPreviewImage(URL.createObjectURL(file))
        await uploadProfileImage(file);
      }
  }

  async function uploadProfileImage(file){
    try {
      const formData = new FormData();
      formData.append("profileImage" , file)
      const response = await axiosInstance.patch('user/upload-profile-image' , formData , {
        withCredentials : true,
      })

      toast.success(response.data.message)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleLoggedOut() {
    try {
      const response = await axiosInstance.post('/user/logout' , {} ,{withCredentials : true});
      toast.success(response.data.message)
      setIsAuth(false);

      navigate('/')
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Navbar />
      <section className="profile-page-section">
        <div className="profile-page-container">
          <div className="profile-picture-and-intro-container">
            <div className="image-and-edit-image-container">
              {/* <img src={profilePic} alt="profile picture" width={150} /> */}
              <FaPen size={30} className="pencil-icon"
              onClick={()=> document.getElementById('profileInput').click()}
              />

              <input type="file" style={{ display: "none" }}
              accept="image/*"
              id="profileInput"
              onChange={handleImageChange}
              />

              <img src={isAuth ? previewImage ||`http://localhost:3000/${user?.profileImage}` : profilePic} alt="profile" />


            </div>
            <div className="text-about-user-container">
              <h1 className="profile-page-name-heading">Julian Vance</h1>
              <p className="intro-of-user">
                Culinary explorer and weekend baker. Sharing my journey through
                heritage recipes and modern fusion techniques. Always looking
                for the perfect sourdough.
              </p>
              <div className="recipes-count-and-follower">
                <div className="recipe-counts">
                  <p className="no-of-count">24</p>
                  <p className="concern-count-name">Recipes</p>
                </div>
                <div className="followers-count">
                  <p className="no-of-count">10</p>
                  <p className="concern-count-name">Followers</p>
                </div>
                <div className="following-count">
                  <p className="no-of-count">20</p>
                  <p className="concern-count-name">Following</p>
                </div>
              </div>
            </div>

            <div className="follow-btn-and-share-icon-container">
              <button onClick={handleLoggedOut}>Logout</button>
              <button>Follow</button>
              <FiShare2 className="share-icon" size={24} />
            </div>
          </div>

          <div className="my-recipes-and-saved-recipes-container">
            <div className="my-recipe-and-saved-recipe-selection-container">
              <button className="active">
                <LuUtensils />
                Recipe
              </button>
              <button>
                <BsBookmark />
                Saved Recipes
              </button>
            </div>
            <div className="recipe-card-container">
              {recipes?.map((recipe) => (
                <RecipeCard
                  items={{
                    recipeImage: recipe.recipeImage,
                    recipeTitle: recipe.recipeTitle,
                    description: recipe.description,
                    preparationTime: recipe.preparationTime,
                    difficulty: recipe.difficulty,
                    id: recipe._id,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
