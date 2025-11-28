import Homepage from "./component/homepage/Homepage"
import { Routes, Route } from "react-router"
import './App.css'
import SingleRecipe from "./component/singleRecipe/SingleRecipe"
import Login from "./component/login/Login"
function App() {
    return(
        <>
        <Routes>
            <Route index element={<Homepage/>}/>
            <Route path="/recipe/:id" element={<SingleRecipe/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
        
        </>
    )
}

export default App
