import { FiUser, FiLock, FiCheckCircle } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify'
import "./signup.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = async (data) => {
    const response = await axiosInstance.post(`user/register` , data , {withCredentials : true} )
    toast.success(response.data.message)

    // reset()
  };
  return (
    <>
      <Navbar />
      <section className="signup-section">
        <div className="sign-up-container">
          <div className="sign-up-header-container">
            <h4>Create Your account</h4>
            <p className="heading-para">
              Start your culinary journey with us today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="full-name-container">
              <label htmlFor="nameinput">FULL NAME</label>
              <div className="name-input-cont">
                <FiUser size={16} className="user-icon" />
                <input
                  type="text"
                  placeholder="ahsanulhaq"
                  id="nameinput"
                  {
                    ...register("name" , {required : true})
                  }
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
            </div>
            <div className="email-address-conatiner">
              <label htmlFor="email-input">EMAIL ADDRESS</label>
              <div className="email-input-cont">
                <FiMail size={16} className="mail-icon" />
                <input
                  type="email"
                  placeholder="ahsan@gmail.com"
                //   id="email-input"
                  name="email_Id"
                  {...register("email" , {
                    required : "required",
                  })}
                />
                {errors.email && (<p>{errors.email.message}</p>)}
              </div>
            </div>

            <div className="password-and-confirm-pass-container">
              <div className="password-container">
                <label htmlFor="pass-input">PASSWORD</label>
                <div className="password-input">
                  <FiLock size={16} className="lock-icon" />
                  <input
                    type="password"
                    placeholder="........"
                    id="pass-input"
                    {...register("password" , {
                        required : true
                    })}
                  />
                  {errors.password && (<p>{errors.password.message}</p>)}
                </div>
              </div>
              <div className="confirm-password-container">
                <label htmlFor="conf-pass-input">CONFIRM PASSWORD</label>
                <div className="confirm-password-input">
                  <FiCheckCircle size={16} className="checkCircle" />
                  <input
                    type="password"
                    placeholder="........"
                    id="conf-pass-input"
                    {...register("confirmPassword" , {
                      required : true
                    })}
                  />
                  {errors.confirmPassword && (<p>{errors.confirmPassword.message} </p>)}
                </div>
              </div>
            </div>
            <button type="submit" className="create-acc-btn">
              Create Account
            </button>
          </form>
          <div className="exist-account-container">
            <p> Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
