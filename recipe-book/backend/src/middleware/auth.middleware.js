import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const verifyJwt = asyncHandler(async(req ,_ ,next)=>{
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ' ,"");

    if(!token){
        throw new ApiError(401 , "UnAuthorized Accessed ") 
    }

    const decodeToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select('-password -refreshToken');

    if(!user){
        throw new ApiError(401 , "Invalid Accessed Token !");
    }

    req.user = user;
    next();
})