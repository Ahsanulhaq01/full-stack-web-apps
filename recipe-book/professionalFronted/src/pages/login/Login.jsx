import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaEye , FaEyeSlash , FaLock } from "react-icons/fa";
import loginPageImage from "./../../assets/loginPageImage.png";
import "./login.css";

function Login() {
  return (
    <>
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
                <GiForkKnifeSpoon color="#c16005"/>
                <h3>GourmetKitchen</h3>
              </div>
              <p className="welcome-heading">Welcome Back</p>
              <p className="welcome-para">Login to your culinary sanctuary.</p>
            </div>
            <form >
            <div className="input-fields-and-login-btn-container">
                <div className="email-address-container">
                    <label htmlFor="email-id">Email Address</label>
                    <div className="email-input">
                    <MdEmail className="email-icon"/>
                   <input type="email" required id="email-id" placeholder="chef@gourmetkitchen.com" />
                    </div>
                </div>
                <div className="password-and-forget-pass-container">
                    <div className="label-icon">
                        <label htmlFor="password">Password</label>
                        <p>Forget Password</p>
                    </div>
                    <div className="password-feild-container">
                        <FaLock className="lock-icon"/>
                        <input type="password" placeholder="......" />
                        <FaEye className="eye-icon"/>
                    </div>
                </div>
                <button className="login-btn">Login</button>
            </div>
            </form>
            <div className="signup-container">
                <p>Don't have an account ?</p>
                <a href="/signup">Signup</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
