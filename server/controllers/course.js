const Course = require('../models/course');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function createCourse(req, res) {
  const course = new Course(req.body);

  if (req.file && req.file.location) {
    course.miniature = req.file.location;
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
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).send({ msg: 'Course not found' });
    }

    if (req.file && req.file.location) {
      if (course.miniature) {
        try {
          const url = new URL(course.miniature);
          const key = decodeURIComponent(url.pathname.substring(1));
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
          };
          await s3.send(new DeleteObjectCommand(params));
        } catch (err) {
          console.error('Error deleting old miniature from S3:', err);
        }
      }
      courseData.miniature = req.file.location;
    }

    const updatedCourse = await Course.findByIdAndUpdate({ _id: id }, courseData, { new: true });
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send({ msg: 'Course not updated' });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).send({ msg: 'Course not found' });
    }

    if (course.miniature) {
      try {
        const url = new URL(course.miniature);
        const key = decodeURIComponent(url.pathname.substring(1));
        const params = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        };
        await s3.send(new DeleteObjectCommand(params));
      } catch (err) {
        console.error('Error deleting image from S3:', err);
      }
    }
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
