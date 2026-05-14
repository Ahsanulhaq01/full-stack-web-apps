import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import loginPageImage from "./../../assets/images/loginPageImage.png";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axiosInstance.post("user/login", data, {
      withCredentials: true,
    });
    toast.success(response.data.message);
    setIsLoggedIn(true);
    navigate("/");
    reset();
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Navbar />
      <section className="login-section">
        <div className="login-container">
          <div className="image-container-with-text">
            <div className="image-container">
              <img
                src={loginPageImage}
                alt="Image"
                className="login-page-image"
              />
              <h3>The Heart of Your Home</h3>
              <p>
                Organize your favorite recipes and discover culinary inspiration
                daily.
              </p>
            </div>
          </div>

          <div className="login-field-container">
            {/* div for login page header */}
            <div className="login-page-header">
              <div className="app-name-with-icon-container">
                <GiForkKnifeSpoon color="#c16005" />
                <h3>GourmetKitchen</h3>
              </div>
              <p className="welcome-heading">Welcome Back</p>
              <p className="welcome-para">Login to your culinary sanctuary.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-fields-and-login-btn-container">
                <div className="email-address-container">
                  <label htmlFor="email-id">Email Address</label>
                  <div className="email-input">
                    <MdEmail className="email-icon" />
                    <input
                      type="email"
                      id="email-id"
                      placeholder="chef@gourmetkitchen.com"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                </div>
                <div className="password-and-forget-pass-container">
                  <div className="label-icon">
                    <label htmlFor="password">Password</label>
                    <p>Forget Password</p>
                  </div>
                  <div className="password-feild-container">
                    <FaLock className="lock-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="......"
                      {...register("password", { required: true })}
                    />
                    {showPassword ? (
                      <FaEyeSlash className="eye-icon" onClick={handleClick} />
                    ) : (
                      <FaEye className="eye-icon" onClick={handleClick} />
                    )}
                  </div>
                </div>
                <button className="login-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
            <div className="signup-container">
              <p>Don't have an account ?</p>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
