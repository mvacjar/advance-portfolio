const express = require('express');
const router = express.Router();
const upload = require('../utils/bucketS3');

router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

export const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = router;
