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
        type: String,
        required:true
    },
    role: { type: String, enum: ['admin', 'student'] ,
        default: 'student' 
    },
    



    //password123@
//name": "John",
  //"email": "johndoe1@gmail.com",
 // "password":"password123@",*/} */ */

});


/* "name": "Dishan Gimhan",
"email": "kdgimhan@gmail.com",
"password":"password123@",
"role":"admin" */
export default mongoose.model('User', UserSchema);