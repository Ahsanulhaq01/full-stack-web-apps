import Homepage from "./component/homepage/Homepage"
import { useState } from "react"
import { Routes, Route } from "react-router"
import './App.css'
import SingleRecipe from "./component/singleRecipe/SingleRecipe"
import Login from "./component/login/Login"
import Signup from "./component/signup/Signup"
function App() {
    const [showPassword ,setShowPassword] = useState(false);
    return(
        <>
        <Routes>
            <Route index element={<Homepage/>}/>
            <Route path="/recipe/:id" element={<SingleRecipe/>}/>
            <Route path="/login" element={<Login showPassword={showPassword} setShowPassword={setShowPassword}/>}/>
            <Route path="/register" element={<Signup showPassword={showPassword} setShowPassword={setShowPassword} />}/>
        </Routes>
        
        </>
    )
}

export default App
