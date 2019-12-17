const AWS = require('aws-sdk');
require('dotenv').config();

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
AWS.config.update({
  accessKeyId: process.env.OS_ACCESS_KEY_ID,
  secretAccessKey: process.env.OS_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3({
  endpoint,
  region,
});

const rootFolder = 'images/';
const bucket = process.env.OS_BUCKET;

function getDeleteObjects(listedObjects) {
  return listedObjects.Contents.reduce(
    (array, { Key }) => [
      ...array,
      {
        Key,
      },
    ],
    [],
  );
}

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
      Objects: getDeleteObjects(listedObjects),
    },
  };

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

async function createFolder(folder) {
  await S3.putObject({
    Bucket: bucket,
    Key: folder,
  }).promise();
}

async function uploadImage(roomId, quizId, filename, buffer) {
  const folder = `${rootFolder}${roomId}/${quizId}/`;
  await createFolder(folder);

  await S3.putObject({
    Bucket: bucket,
    Key: `${folder}${filename}`,
    Body: buffer,
    ACL: 'public-read',
  }).promise();
}

module.exports = {
  uploadImage,
  deleteQuizsetFolder,
  deleteQuizFolder,
};
