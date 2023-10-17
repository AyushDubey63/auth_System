import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"please provide unique Username"],
        unique: [true,"Username Exist"]
    },
    password:{
        type : String,
        required: [true,"Please provide a password"],
        unique: false
    },
    email:{
        type: String,
        required:[true,"Please provide a email"],
        unique: true
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    mobile:{
        type: String
    },
    address:{
        type: String
    },
    profile:{
        type: String
    }
})

export default mongoose.model.Users || mongoose.model('User',UserSchema)