const courseService = require('../services/course.service')

module.exports = {
    createCourse,
    getCourses,
    deleteCourse,
    getEnrolledStudents
};


function createCourse(req, res, next) {

    courseService.addCourse(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}

function getCourses(req,res,next){
    console.log('GetCourses()',req.body);
    courseService.getAllCourses(req).then(courses => {console.log('# of Courses sent:', courses.length);
        res.json(courses)}).catch(err => next(err));
}


//TODO: notice this new function.
function getEnrolledStudents(req,res,next){

    courseService.getEnrolledStudents(req.params.id).then(students => {console.log('# of Students sent:', students.length);
        res.json(students)}).catch(err => next(err));
}

function deleteCourse(req,res,next){
    console.log('DeleteCourse()',req.params);
    courseService.deleteCourse(req.params.id).then(courses => {console.log('# of Courses sent:', courses.length);
        res.json(courses)}).catch(err => next(err));
}
