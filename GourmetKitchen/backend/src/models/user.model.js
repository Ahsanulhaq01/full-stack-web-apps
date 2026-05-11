import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String , 
        unique : true  ,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        required :true,
        minlength : 6,
    },
    profileImage : {
        type : String ,
        default : "",

    },
    refreshToken : {
        type : String,
    }
} , {timestamps : true})

const User = mongoose.model('User' , userSchema);

userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password , 10);

    next();
})


userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
       { 
        _id : this._id,
        email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn :process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.RREFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.RREFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model('User' , userSchema);

export default User;