import Homepage from "./component/homepage/Homepage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import SingleRecipe from "./component/singleRecipe/SingleRecipe";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import RouteTitle from "./utils/RouteTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadRecipe from "./component/upload-recipe/UploadRecipe";
function App() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <RouteTitle />
      <ToastContainer />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/recipe/:id" element={<SingleRecipe />} />
        <Route
          path="/login"
          element={
            <Login
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Signup
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />
        <Route path="/upload-recipe" element={<UploadRecipe />} />
      </Routes>
    </>
  );
}

export default App;
