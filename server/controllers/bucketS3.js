import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function handleUpload(req, res, next) {
  try {
    const file = req.file;
    const key = `images/${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    res.json({ url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}` });
  } catch (err) {
    next(err);
  }
}
