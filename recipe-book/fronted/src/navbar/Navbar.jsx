import "./navbar.css";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../utils/axiosInstance.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../context/AthContext.jsx";
import { useState } from "react";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  async function handleLogOut(e) {
    e.preventDefault();
    if (!user) {
      return toast.error("You are not Logged In");
    }

    Swal.fire({
      title: "are you sure ?",
      text: "you will be logout",
      icon: "warning",
      width: "350px",
      showCancelButton: true,
      confirmButtonText: "Yes , Logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post("/user/logout", {});
          toast.success(response.data.message);
          setTimeout(() => {
            setUser(null);
          }, 1000);
          navigate("/");
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      }
    });
  }

  return (
    <>
      <div className="container">
        <Link to={"/"}>
          <span id="logo-id">RECIPE BOOK</span>
        </Link>

        <button onClick={() => setIsSidebarOpen(true)} className="hide btn">
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className={isSidebarOpen ? "sidebar active" : "sidebar"}>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="list-of-pages">
            <Link to={"/"}>Home</Link>
            <Link to={"/register"}>Sign up</Link>
            <Link to={"/login"}>Login</Link>
            <Link onClick={handleLogOut}>logout</Link>
            <Link to={user ? "/upload-recipe" : "/login"}>
              {user ? "Upload-Recipe" : "guest"}
            </Link>
          </div>
        </div>

        <ul className="nav-list">
          <li>
            <Link to={"/register"}>Sign up</Link>
          </li>

          <li>
            <Link to={"/login"}>Login</Link>
          </li>

          <li>
            <Link onClick={handleLogOut}>Logout</Link>
          </li>

          <li>
            <Link to={user ? "/upload-recipe" : "/login"}>
              {user ? "Upload-Recipe" : "Guest"}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
