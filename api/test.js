// const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require("@azure/storage-blob");
// require('dotenv').config();

// const account = "mockinterviewblobstorage"; // Your storage account name
// const accountKey = process.env.AZURE_STORAGE_KEY; // Corrected account key variable

// const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
// // console.log(accountKey)
// const blobServiceClient = new BlobServiceClient(
//     `https://${account}.blob.core.windows.net`,
//     sharedKeyCredential
// );

// const containerName = "videostorage"; // Correct container name
// const blobName = "blob"; // or specify a blob name if applicable

// const sasOptions = {
//     containerName: containerName,
//     blobName: blobName,
//     permissions: BlobSASPermissions.parse("rw"), // Adjust permissions as needed
//     startsOn: new Date("2024-04-18T06:35:00Z"),
//     expiresOn: new Date("2024-04-19T14:35:00Z"),
//     protocol: "https"
// };

// const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
// console.log(sasToken);

// const blobUrl = `https://${account}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
// console.log("Blob URL with SAS:", blobUrl);

// // You can now access this URL directly in the


// const extractAudio = require('ffmpeg-extract-audio')
 
// await extractAudio({
//   input: '../video_test/file_example_MP4',
//   output: 'test.mp3'
// })


// 58fe51bf9522a45307e29fe6a7006fe4406d57fc



const fs = require('fs')
const https = require('https')
const { execSync: exec } = require('child_process')
const { Deepgram } = require('@deepgram/sdk')
const ffmpegStatic = require('ffmpeg-static')


const deepgram = new Deepgram('58fe51bf9522a45307e29fe6a7006fe4406d57fc')

async function downloadFile(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        const fileName = url.split('/').slice(-1)[0] // Get the final part of the URL only
        const fileStream = fs.createWriteStream(fileName)
        response.pipe(fileStream)
        response.on('end', () => {
          fileStream.close()
          resolve(fileName)
        })
      })
    })
  }