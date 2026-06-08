import { Follow } from "../models/follow.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const followUser = asyncHandler(async (req, res) => {

    const followerId = req.user._id;   // logged-in user
    const followingId = req.params.id; // user to follow

    if (followerId.toString() === followingId) {
        return res.status(400).json({
            success: false,
            message: "You cannot follow yourself"
        });
    }

    const alreadyFollowing = await Follow.findOne({
        follower: followerId,
        following: followingId
    });

    if (alreadyFollowing) {
        return res.status(400).json({
            success: false,
            message: "Already following this user"
        });
    }

    const follow = await Follow.create({
        follower: followerId,
        following: followingId
    });

    return res.status(201).json(
        new ApiResponse(201, follow, "User followed successfully")
    );
});



const getFollowersCount = asyncHandler(async (req, res) => {

    const userId = req.params.id;

    const count = await Follow.countDocuments({
        following: userId
    });

    return res.status(200).json(
        new ApiResponse(200, count, "Followers count fetched")
    );
});


const getFollowingCount = asyncHandler(async (req, res) => {

    const userId = req.params.id;

    const count = await Follow.countDocuments({
        follower: userId
    });

    return res.status(200).json(
        new ApiResponse(200, count, "Following count fetched")
    );
});

export {followUser , getFollowersCount , getFollowingCount};