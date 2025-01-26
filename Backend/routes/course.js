import express from 'express';
import {addCourse, deleteCourse, editCourse, getAllCourse, getCourseById} from "../controllers/CourseController.js"



const router = express.Router();

router.post('/addCourse',addCourse);
router.get('/all',getAllCourse);
router.delete('/delete/:id',deleteCourse);
router.put('/update/:id',editCourse);
router.get('/edit/:id',getCourseById);


export default router;

