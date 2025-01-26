import express from 'express';
import {addStudent, deleteStudent, editStudent, getAllStudent, getStudentById} from "../controllers/StudentController.js"



const router = express.Router();

router.post('/addstudent',addStudent);
router.get('/all',getAllStudent);
router.delete('/delete/:id',deleteStudent);
router.put('/edit/:id',editStudent);
router.get('/get/:id',getStudentById);



export default router;

