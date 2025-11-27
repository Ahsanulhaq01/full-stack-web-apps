import Homepage from "./component/homepage/Homepage"
import { Routes, Route } from "react-router"
import './App.css'
import SingleRecipe from "./component/singleRecipe/SingleRecipe"
function App() {
    return(
        <>
        <Routes>
            <Route index element={<Homepage/>}/>
            <Route path="/recipe/:id" element={<SingleRecipe/>}/>
        </Routes>
        
        </>
    )
}

export default App
