import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lists: {
        type: Array,
    },
 }, { timestamps: true });

 export default mongoose.model("User", userSchema);
