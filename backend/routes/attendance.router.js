var express = require('express');
var router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.post('/add', authorize(Role.professor), attendanceController.createAttendance);

router.post('/track', authorize(Role.student), attendanceController.attend);

router.delete('/:id', attendanceController.deleteAttendance);

router.get('/prof:id', authorize(Role.professor), attendanceController.getAttendances);


router.get('/student:id/:id1', attendanceController.studentGetAttendances);



module.exports = router;
