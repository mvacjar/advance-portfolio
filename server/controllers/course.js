const Course = require('../models/course');
const image = require('../utils/image');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

async function createCourse(req, res) {
  const course = new Course(req.body);

  if (req.file && req.file.location) {
    user.avatar = req.file.location;
  }

  try {
    const courseStored = await course.save();
    res.status(201).send(courseStored);
  } catch (error) {
    res.status(400).send({ msg: 'Course not created' });
  }
}

async function getCourses(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const courses = await Course.paginate({}, options);
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Courses not found' });
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  try {
    if (req.files && req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      courseData.miniature = imagePath;
    }

    const updatedCourse = await Course.findByIdAndUpdate({ _id: id }, courseData, { new: true });

    if (!updatedCourse) {
      return res.status(404).send({ msg: 'Course not found' });
    }

    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send({ msg: 'Course not updated' });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Course deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'Course not deleted' });
  }
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
