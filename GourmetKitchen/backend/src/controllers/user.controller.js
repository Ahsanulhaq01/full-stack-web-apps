import User from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req , res)=>{
    const {name , email , password} = req.body;
    const existingUser = await User.findOne({"email" :  email});

    if(existingUser){
        return res.status(200).json(
            new ApiResponse(200 , null , "User already existed")
        )
    }

    const user = await User.create({
        name , email , password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201).json(
        new ApiResponse(201 , createdUser , "User SuccessFully Registered")
    )
})

const loginUser = asyncHandler(async(req , res)=>{
    const {email , password} = req. body;
    
    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json(404 , null , "User not found")
    }

    const isPasswordValid =  user.isPasswordCorrect(password);
    if(!isPasswordValid){
        return res.status(401).json(
            new ApiResponse(401 , null , "Invalid Credentials")
        )
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave : false});

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
    .cookie('accessToken' , accessToken , options)
    .cookie('refreshToken' , refreshToken , options)
    .json(
        new ApiResponse(200 , loggedInUser , "Login SuccessFully")
    )

});

export {registerUser , loginUser }