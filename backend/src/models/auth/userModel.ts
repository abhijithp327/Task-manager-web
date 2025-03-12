import mongoose from "mongoose";
import { BlockList } from "net";

const UserSchema = new mongoose.Schema({

    usr_name: {
        type: String,
        required: true
    },

    usr_email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    usr_password: {
        type: String,
        required: true
    },

    usr_photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/19819005?v=4"
    },

    usr_bio: {
        type: String,
        default: "I am a new user."
    },

    usr_role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true,
        minimize: true
    }
);


export default mongoose.model('User', UserSchema);