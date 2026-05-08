import { FiSearch ,FiSliders } from "react-icons/fi";
import './messagetouser.css'



function MessagetoUser() {
  return (
      <div className="home-header-user-msg-container">
        <h1 className="first-heading"> Discover Delicious Recipes </h1>
        <p className="msg-to-user">
          
          Master the art of cooking with hand-picked gourmet recipes from
          world-class home chefs. Your next favorite meal is just a search
          away.
        </p>
        <div className="search-and-filter-btn-container">
          <div className="input-and-search-icon">
            <FiSearch size={20} className="search-icon"/>
            <input
              type="text"
              placeholder="Search for Ingrediant , Recipes, and Cuisine...."
            />
          </div>
          <button className="filter-items-btn">

<FiSliders size={18} />
Filter
          </button>
        </div>
      </div>
  );
}

export default MessagetoUser;
