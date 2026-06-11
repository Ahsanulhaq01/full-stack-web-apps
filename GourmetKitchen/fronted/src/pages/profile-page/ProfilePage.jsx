import profilePic from "./../../assets/images/imageIcon.png";
import { BsBookmark } from "react-icons/bs";
import { LuUtensils } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import RecipeCard from "./../../components/recipeCard/RecipeCard";
import Navbar from "../../components/navbar/Navbar";
import "./profilePage.css";
import { useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import useGetUser from "../../customHook/useGetUser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const {id} = useParams();
  const [recipes , setRecipes] = useState([]);
  const [currentUser] = useGetUser(); // Logged-in user
  const [user] = useGetUser(id); // Profile user
  const { isLoggedIn, setIsLoggedIn, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipeCount , setRecipeCount] = useState()
  const [followingCount , setFollowingCount] = useState(0);
  const [followerCount , setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("Recipes");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [profilePreview, setProfilePreview] = useState(null);
 
  async function handleImageChange(e){
      const file = e.target.files[0];

      if(file){
        // Create local preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePreview(reader.result);
        };
        reader.readAsDataURL(file);

        await uploadProfileImage(file);
      }
  }

  async function uploadProfileImage(file){
    try {
      const formData = new FormData();
      formData.append("profileImage" , file)
      const response = await axiosInstance.patch('user/upload-profile-image' , formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials : true,
      })

      toast.success(response.data.message)
    } catch (error) {
      console.error("Upload error details:", error);
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network error: Server might be down or file is too large. Check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to upload image");
      }
      // Revert preview on failure
      setProfilePreview(null);
    }
  }

  async function handleLoggedOut() {
    try {
      const response = await axiosInstance.post('/user/logout' , {} ,{withCredentials : true});
      toast.success(response.data.message)
      setIsLoggedIn(false);

      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function getCreatorRecipes() {
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/recipes/recipes?userId=${user._id}`);
      setRecipes(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function recipeCounts(){
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/recipes/recipes?userId=${user._id}`)
      setRecipeCount(response.data.data.length)
    } catch (error) {
      console.log(error)
    }
  }

  async function getFollowingCount(){
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/following/${user._id}`)
      setFollowingCount(response?.data?.data);
    } catch (error) {
      console.log(error)
    }
  }

  async function getFollowerCount(){
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/followers/${user._id}`)
      setFollowerCount(response?.data?.data);
    } catch (error) {
      console.log(error)
    }
  }

  async function getFollowStatus(){
    if (!user?._id || !isLoggedIn) return;
    try {
      const response = await axiosInstance.get(`/status/${user._id}`);
      setIsFollowing(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSavedRecipes() {
    if (!isLoggedIn) return;
    try {
      const response = await axiosInstance.get('/saved-recipes');
      setSavedRecipes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'GourmetKitchen Profile',
      text: `Check out ${user?.name || 'this'} profile on GourmetKitchen!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Profile link copied to clipboard!");
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  useEffect(()=>{
    getCreatorRecipes();
    recipeCounts();
    getFollowingCount();
    getFollowerCount();
    getFollowStatus();
    if (activeTab === "Saved") getSavedRecipes();
  } , [user, isLoggedIn, activeTab])


  async function toggleFollow(profileId){
    try {
      if (isFollowing) {
        const response = await axiosInstance.delete(`/unfollow/${profileId}`);
        toast.success(response.data.message);
        setIsFollowing(false);
        setFollowerCount(prev => prev - 1);
      } else {
        const response = await axiosInstance.post(`/follow/${profileId}`, null);
        toast.success(response.data.message);
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
 
  useEffect(() => {
    if (!authLoading && !id && isLoggedIn === false) {
      toast.info("you are not register");
      navigate('/login');
    }
  }, [id, isLoggedIn, authLoading, navigate]);

  if (authLoading || (!id && isLoggedIn === false)) return null;

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

              <img src={isLoggedIn ? (user?.profileImage == '' ? profilePic : user?.profileImage) : profilePic} alt="profile" />


            </div>
            <div className="text-about-user-container">
              <h1 className="profile-page-name-heading">{user?.name || 'JHON'}</h1>
              <p className="intro-of-user">
                Culinary explorer and weekend baker. Sharing my journey through
                heritage recipes and modern fusion techniques. Always looking
                for the perfect sourdough.
              </p>
              <div className="recipes-count-and-follower">
                <div className="recipe-counts">
                  <p className="no-of-count">{recipeCount || 0}</p>
                  <p className="concern-count-name">Recipes</p>
                </div>
                <div className="followers-count">
                  <p className="no-of-count">{followerCount}</p>
                  <p className="concern-count-name">Followers</p>
                </div>
                <div className="following-count">
                  <p className="no-of-count">{followingCount}</p>
                  <p className="concern-count-name">Following</p>
                </div>
              </div>
            </div>

            <div className="follow-btn-and-share-icon-container">
              {!isLoggedIn && (
                <button 
                  className="responsive-login-btn" 
                  onClick={() => navigate('/login')}
                  disabled={isLoggedIn}
                >Login</button>
              )}

              {currentUser?._id === user?._id && (
                <button 
                  onClick={handleLoggedOut}
                  disabled={!isLoggedIn}
                >Logout</button>
              )}
              
              {currentUser && user && currentUser._id !== user._id && (
                <button onClick={() => toggleFollow(user._id)}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
              
              <FiShare2 className="share-icon" size={24} onClick={handleShare} />
            </div>
          </div>

          <div className="my-recipes-and-saved-recipes-container">
            <div className="my-recipe-and-saved-recipe-selection-container">
              <button 
                className={activeTab === "Recipes" ? "active" : ""} 
                onClick={() => setActiveTab("Recipes")}
              >
                <LuUtensils />
                Recipe
              </button>
              {currentUser?._id === user?._id && (
                <button 
                  className={activeTab === "Saved" ? "active" : ""} 
                  onClick={() => setActiveTab("Saved")}
                >
                  <BsBookmark />
                  Saved Recipes
                </button>
              )}
            </div>
            <div className="recipe-card-container">
              {(activeTab === "Recipes" ? recipes : savedRecipes)?.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
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
