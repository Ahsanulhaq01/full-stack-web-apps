import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

const verifyjwt = asyncHandler(async(req , res , next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        return res.status(404).json(
            new ApiResponse(404 , null , "UnAuthorized Request")
        )
    }


    const decodeToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    )

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken");

    if(!user){
        return res.status(401).json(
            new ApiResponse(401 , null , "Invalid Access Token")
        )
    }

    req.user = user;
    next();
})

export default verifyjwt;