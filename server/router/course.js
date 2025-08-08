const express = require('express');
const CourseController = require('../controllers/course');
const md_auth = require('../middleware/authenticated');
const md_upload = require('../middleware/bucketS3');

const api = express.Router();

api.post(
  '/course',
  [md_auth.assureAuth, md_upload.single('miniature')],
  CourseController.createCourse
);
api.get('/courses', CourseController.getCourses);
api.patch(
  '/course/:id',
  [md_auth.assureAuth, md_upload.single('miniature')],
  CourseController.updateCourse
);
api.delete(
  '/course/:id',
  [md_auth.assureAuth, md_upload.single('miniature')],
  CourseController.deleteCourse
);

module.exports = api;
