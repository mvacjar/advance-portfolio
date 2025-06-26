const express = require('express');
// const multiparty = require('connect-multiparty');
const CourseController = require('../controllers/course');
const md_auth = require('../middleware/authenticated');
const md_upload = require('../utils/bucketS3');

// const md_upload = multiparty({ uploadDir: 'uploads/course' });

const api = express.Router();

api.post('/course', [md_auth.asureAuth, md_upload.single('miniature')], CourseController.createCourse);
api.get('/courses', CourseController.getCourses);
api.patch('/course/:id', [md_auth.asureAuth, md_upload.single('miniature')], CourseController.updateCourse);
api.delete('/course/:id', [md_auth.asureAuth, md_upload.single('miniature')], CourseController.deleteCourse);

module.exports = api;
