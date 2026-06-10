import { Follow } from "../models/follow.model.js";
import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const followUser = asyncHandler(async (req, res) => {

    const followerId = req.user._id;   // logged-in user
    const followingId = req.params.id; // user to follow

    if (followerId.toString() === followingId) {
        return res.status(200).json(
            new ApiResponse(200 , null , "you cannot follow yourself")
        );
    }

    const alreadyFollowing = await Follow.findOne({
        follower: followerId,
        following: followingId
    });

    if (alreadyFollowing) {
        return res.status(200).json(
            new ApiResponse(200,
            null,
            "Already following this user"
        ));
    }

    const follow = await Follow.create({
        follower: followerId,
        following: followingId
    });

    // Create notification
    await Notification.create({
        recipient: followingId,
        sender: followerId,
        type: "follow"
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

const unfollowUser = asyncHandler(async (req, res) => {
    const followerId = req.user._id;
    const followingId = req.params.id;

    const result = await Follow.findOneAndDelete({
        follower: followerId,
        following: followingId
    });

    if (!result) {
        return res.status(404).json(
            new ApiResponse(404, null, "You were not following this user")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, null, "User unfollowed successfully")
    );
});

const checkFollowStatus = asyncHandler(async (req, res) => {
    const followerId = req.user._id;
    const followingId = req.params.id;

    const follow = await Follow.findOne({
        follower: followerId,
        following: followingId
    });

    return res.status(200).json(
        new ApiResponse(200, !!follow, "Follow status fetched")
    );
});

export {followUser , getFollowersCount , getFollowingCount, unfollowUser, checkFollowStatus};