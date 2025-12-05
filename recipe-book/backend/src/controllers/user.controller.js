import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandlers.js";



const generateAccesssAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);

        if(!user){
            throw new ApiError(404 , "user not found")
        }
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken(); 
        user.refreshToken = refreshToken;
        await user.save({ValidateBeforeSave : false});
        return {accessToken , refreshToken};
        
    } catch (error) {
        // console.log(error)
        throw new ApiError(500 , "error while generating Access and Refresh Token !") 
    }
}
const registerUser = asyncHandler(async(req ,res)=>{
    const {username , email , password} = req.body;

    if([username , email , password].some((field) => field.trim() === "")){
        throw new  ApiError(400 , "All field are required !")
    }

    const existedUser = await User.findOne({
        $or : [ {username} , {email} ]
    })

    if(existedUser){
        throw new ApiError(409 , "user with this email or username already exist")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User SuccessFully Registered !")
    )
})

const loginUser = asyncHandler(async(req ,res)=>{
    const {username , email , password} = req.body;

    if(!(username || email)){
        throw new ApiError(400 , "username or email is required !")
    }
 
    const user = await User.findOne({
        $or :[{username} , {email}]
    });

    if(!user){
        throw new ApiError(404 , "user does not exist !")
    }

    const isPasswordValid = user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401 , "Invalid Credentials !")
    }

    const {accessToken , refreshToken} = await generateAccesssAndRefreshToken(user._id);

    //loggined user with abstraction of secret details
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //setting up the cookies

    const options = {
        httpOnly : true,
        secure : true,
    }
 
    res.status(200)
    .cookie('accessToken' , accessToken , options)
    .cookie('refreshToken' , refreshToken , options)
    .json(
        new ApiResponse(200 , {user : loggedInUser , accessToken ,refreshToken} , "User logged in successFully !")
    )
})
 
const logoutUser = asyncHandler(async(req , res)=>{

    await User.findByIdAndUpdate
    (
        req.user._id,
        {
            $set : {refreshToken : undefined}
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res.status(200).clearCookie('accessToken' , options).clearCookie('refreshToken' , options).json(new ApiResponse(200 , {} , "User SuccessFully Logout"))
})

export {registerUser , loginUser , logoutUser }