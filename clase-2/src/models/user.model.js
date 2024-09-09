import {Schema, model} from "mongoose"

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})

const UserModel = model("users", userSchema)

export default UserModel;

