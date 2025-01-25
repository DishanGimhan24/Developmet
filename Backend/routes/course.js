import express from 'express';
import {addCourse, deleteCourse, editCourse, getAllCourse, getCourseById} from "../controllers/CourseController.js"



const router = express.Router();

router.post('/addCourse',addCourse);
router.get('/all',getAllCourse);
router.delete('/delete/:id',deleteCourse);
router.put('/edit/:id',editCourse);
router.get('/get/:id',getCourseById);


export default router;

