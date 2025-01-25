import mongoose from "mongoose";

const CourseSchema= new mongoose.Schema({

    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    duration:{
        type: Number,
        required:true
    },
    fee:{
        type: Number,
        required:true
    }

});

export default mongoose.model('Course', CourseSchema);