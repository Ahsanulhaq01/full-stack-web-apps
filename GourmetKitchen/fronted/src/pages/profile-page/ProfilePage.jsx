import profilePic from "./../../assets/profile-pic.jpeg";
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
import { useEffect } from "react";

function ProfilePage() {
  const [recipes] = useGetRecipes([]);
  const [userData, setUserData] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const getUserData = async()=>{
    try {
      const response = await axiosInstance("user/" , {withCredentials : true});
      setUserData(response.data.data[0])
      console.log(response.data.data[0].profileImage)
    } catch (error) {
      console.log(error)
    }
  }
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

      toast.success("response.data.message")
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getUserData();
  } , [])
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

              <img src={previewImage ||profilePic} alt="profile" />


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
