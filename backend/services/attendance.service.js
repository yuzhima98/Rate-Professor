

const db = require('../_helpers/database');
const mongoose = require("mongoose");
const User = db.User;
const Attendance = db.Attendance;


module.exports = {
    studentGetAttendances,
    getAttendances,
    deleteAttendance,
    attend,
    createAttendance
}



//TODO: you need to produce an array of JSONs with 'sartTime' (Date), 'missed' (Boolean). It is up to you whether to do it here or in the controller.
async function studentGetAttendances(req) {
    let courseID = req.params.id;
    let studentID = req.params.id1;
    let resultArray = [];
    let attendanceArray = await getAttendances(courseID);
    //console.log(attendanceArray);
    attendanceArray.forEach(attendance => {
        let missed = true;
        if(attendance.users.includes(studentID)){
            missed = false;
        }
        const elem = {
          startTime: attendance.startTime,
          missed: missed
        };
        resultArray.push(elem);
    });
    //console.log(resultArray);
    return resultArray;
}

//TODO: here you provide a list of attendances for a given course ID.
// Remember that on the Angular side the component wants to display  'username', 'firstName', 'lastName', 'attendanceRate', 'id'. Hint: use Mongoose's .populate({path:'...', select:'field1 field2 field3'});
async function getAttendances(req) {
    return await Attendance.find({course:req});
    //return await Attendance.find({course:req}).populate({path:'users',select:'username firstName lastName _id'});
}

//TODO (optional/bonus): delete an attendance object. The req object will contain the id of the attendance object.
async function deleteAttendance(req) {
    return await Attendance.deleteOne({"_id":req});
}



// TODO: handle students requests to 'attend'
//  Here you receive 'accessCode' and user's
//  ObjectId in 'req.user.sub' you must deal
//  with the following cases (in addition to the positive one):
//  -- invalid access code,
//  -- expired access code,
//  -- used access code (already attended),
//  -- not enrolled in the course Hint: use
//  'new Date(...).getTime()' to measure expiration.
//  Keep in mind that that getTime() return milliseconds
//  and we want to measure difference in minutes.
async function attend(req) {
    let accessCode = req.body.accessCode;
    let isNum = /^\d+$/.test(accessCode);
    if(isNum){
        accessCode = parseInt(accessCode);
        if(accessCode >= 1000000 && accessCode <= 9999999){
            if(await Attendance.findOne({accessCode:accessCode})){
                let one = await Attendance.findOne({accessCode:accessCode});
                if(one.users.includes(req.user.sub)){
                    throw "Already attended!";
                }
                let user = await User.findOne({_id:req.user.sub});
                //console.log(user);
                if(user.courses.includes(one.course)){
                    let duration = one.duration;
                    let startTime = new Date(one.startTime);
                    let start = startTime.getTime();
                    let end = start + 60000*duration;
                    let now = new Date().getTime();
                    if(now <= end){
                        one.users.push(req.user.sub);
                        return await Attendance.updateOne({_id:one._id}, {$set: {"users": one.users}});
                    } else {
                        throw "Access code has expired!";
                    }
                } else{
                    throw "You are not enrolled in this course!";
                }
            } else{
                throw "Wrong access code!";
            }
        } else {
            throw "Wrong access code!";
        }
    } else{
        throw "Malformed access code!";
    }
}



async function createAttendance(req) {
    let attendance = req.body;
    if(!req.user.sub){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    console.log(req.user.sub);
    attendance.prof = req.user.sub;
    attendance = new Attendance(attendance);
    return await attendance.save();

}
