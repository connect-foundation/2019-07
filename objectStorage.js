const AWS = require("aws-sdk");
require("dotenv").config();

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
AWS.config.update({
  accessKeyId: process.env.OS_ACCESS_KEY_ID,
  secretAccessKey: process.env.OS_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3({
  endpoint,
  region,
});

const rootFolder = "images/";
const bucket = process.env.OS_BUCKET;

async function emptyS3Directory(dir) {
  const listParams = {
    Bucket: bucket,
    Prefix: dir,
  };

  const listedObjects = await S3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: {
      Objects: [],
    },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({
      Key,
    });
  });

  await S3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

async function deleteQuizsetFolder(roomId) {
  const folder = `${rootFolder}${roomId}/`;
  emptyS3Directory(folder);
}

async function deleteQuizFolder(roomId, quizId) {
  const folder = `${rootFolder}${roomId}/${quizId}/`;
  emptyS3Directory(folder);
}

async function uploadImage(roomId, quizId, filename, buffer) {
  // create folder
  const folder = `${rootFolder}${roomId}/${quizId}/`;
  await S3.putObject({
    Bucket: bucket,
    Key: folder,
  }).promise();

  // upload file
  await S3.putObject({
    Bucket: bucket,
    Key: `${folder}${filename}`,
    Body: buffer,
    ACL: "public-read",
    // ACL을 지우면 전체공개가 되지 않습니다.
  }).promise();
}

module.exports = {
  uploadImage,
  deleteQuizsetFolder,
  deleteQuizFolder,
};
