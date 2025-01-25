import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: Number,
        required:true
    },
    role: { type: String, enum: ['admin', 'student'] },

});

export default mongoose.model('User', UserSchema);