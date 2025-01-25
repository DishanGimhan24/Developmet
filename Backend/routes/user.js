import express from 'express';
import {addUser, deleteUser, editUser, getAllUser, getUserById} from "../controllers/UserController.js"



const router = express.Router();

router.post('/add',addUser);
router.get('/all',getAllUser);
router.delete('/delete/:id',deleteUser);
router.put('/edit/:id',editUser);
router.get('/get/:id',getUserById);



export default router;

