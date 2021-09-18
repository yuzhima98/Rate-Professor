const db = require('../_helpers/database');
const mongoose = require("mongoose");
const Course = db.Course;
const User = db.User;


module.exports = {
    getAllCourses,
    addCourse,
    deleteCourse,
    getEnrolledStudents
}


async function getAllCourses() {

    return await Course.find().populate({path:'createdBy',select:'username'});
}

async function deleteCourse(id) {
     return await Course.deleteOne({"_id":id});
}

//TODO: notice this new function.
async function getEnrolledStudents(id) {
    return await User.find({'courses': mongoose.Types.ObjectId(id), role:'Student'}).select('-hash -courses');
}

async function addCourse(req) {

    let course = req.body;

    // validate
    if (await Course.findOne({ courseNumber: course.courseNumber, courseDept: course.courseDept  })) {
        throw 'Course "' + course.courseDept + course.courseNumber +'" already exists';
    }
    else if(!req.user.sub){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    //populate missing fields in the course object
    course.createdBy = req.user.sub;
    course.createdDate =  Date.now();

    course = new Course(course);


    // save user
    await course.save();
}
