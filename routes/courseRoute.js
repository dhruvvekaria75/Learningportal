const { createCourse, getAllcources, updatecources, deletecources, getAcources, getParticularInstructorCourses } = require("../controllers/courseCtrl");
const { createLesson, deleteLession, getAlession, getAllcourseLesson, updateAlession } = require("../controllers/lessonCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
const courseRouter=require("express").Router();

courseRouter.post('/',authMiddleware,restrictTo("Admin","Instructor"),createCourse);
courseRouter.get('/all',getAllcources);
courseRouter.get('/:slug',getAcources);
courseRouter.put('/:id',authMiddleware,restrictTo("Admin","Instructor"),updatecources);
courseRouter.delete('/:id',authMiddleware,restrictTo("Admin","Instructor"),deletecources);
courseRouter.get('/instructor/all-courses',authMiddleware,restrictTo("Admin","Instructor"),getParticularInstructorCourses);

//================lesson router==================//
courseRouter.post("/lesson/:courseId",authMiddleware,restrictTo("Admin","Instructor"),createLesson);
courseRouter.delete("/lesson/:courseId/:lessonId",authMiddleware,restrictTo("Admin","Instructor"),deleteLession);
courseRouter.get("/lesson/:lessonId",authMiddleware,restrictTo("Admin","Instructor"),getAlession);
courseRouter.get("/lessons/:courseId",authMiddleware,restrictTo("Admin","Instructor"),getAllcourseLesson);
courseRouter.put("/lesson/:lessonId",authMiddleware,restrictTo("Admin","Instructor"),updateAlession);


module.exports=courseRouter;