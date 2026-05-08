import { FiUser ,FiLock , FiCheckCircle } from "react-icons/fi";
import { FiMail } from "react-icons/fi";

import './signup.css'


function SignUp() {

    const handleSubmit = ()=>{
        console.log('hello from ahsan')
    }
  return (
   <>
    <section className="signup-section">
        <div className="sign-up-container">
            <div className="sign-up-header-container">
                <h4>Create Your account</h4>
                <p className="heading-para">Start your culinary journey with us today.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="full-name-container">
                    <label htmlFor="nameinput">FULL NAME</label>
                    <div className="name-input-cont">
                    <FiUser size={16}  className="user-icon"/>
                    <input type="text" id='nameinput' name='full_name' placeholder='ahsanulhaq' />
                    </div>
                </div>
                <div className="email-address-conatiner">
                    <label htmlFor="email-input">EMAIL ADDRESS</label>
                    <div className="email-input-cont">
                    <FiMail size={16} className="mail-icon"/>
                    <input type="email" id='email-input' name='email_Id' placeholder='ahsan@gmail.com' />
                    </div>
                </div>

                <div className="password-and-confirm-pass-container">
                    <div className="password-container">
                        <label htmlFor="pass-input">PASSWORD</label>
                        <div className="password-input">
                            <FiLock size={16} className="lock-icon" />
                            <input type="password" placeholder='........' id='pass-input' />
                        </div>

                    </div>
                    <div className="confirm-password-container">
                        <label htmlFor="conf-pass-input">CONFIRM PASSWORD</label>
                        <div className="confirm-password-input">
                            <FiCheckCircle size={16} className="checkCircle"/>
                            <input type="password" placeholder='........' id='conf-pass-input' />
                        </div>

                    </div>
                </div>
                <button type='submit' className="create-acc-btn">Create Account</button>
            </form>
            <div className="exist-account-container">
                <p> Already have an account?</p>
                <a href="/login">Login</a>
            </div>
        </div>
    </section>
   </>
  )
}

export default SignUp