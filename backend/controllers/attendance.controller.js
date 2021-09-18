const attendanceService = require('../services/attendance.service')

module.exports = {
    createAttendance,
    attend,
    deleteAttendance,
    getAttendances,
    studentGetAttendances
};


function createAttendance(req, res, next) {
    attendanceService.createAttendance(req).then(result => {console.log('run create attendance');
        res.json(result)}).catch(err => next(err));

}

function attend(req,res,next){
    attendanceService.attend(req).then(result => {console.log('run attend');
        res.json(result)}).catch(err => next(err));
}


function deleteAttendance(req,res,next){
    attendanceService.deleteAttendance(req.params.id).then(result => {
        res.json(result)}).catch(err => next(err));
}


function getAttendances(req,res,next){
    attendanceService.getAttendances(req.params.id).then(result => {
        res.json(result)}).catch(err => next(err));
}


function studentGetAttendances(req,res,next){

    attendanceService.studentGetAttendances(req).then(attendances => {

        res.json(attendances)}).catch(err => next(err));
}
