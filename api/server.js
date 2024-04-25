// // const express = require('express');
// // const multer = require('multer');
// // const cors = require('cors');
// // const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
// // const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require("@azure/storage-blob");
// // const axios = require('axios');
// // const { v4: uuidv4 } = require('uuid');
// // require('dotenv').config();
// // const axios = require('axios');

// // const AZURE_VIDEO_INDEXER_KEY = process.env.AZURE_VIDEO_INDEXER_KEY;
// // const AZURE_VIDEO_INDEXER_LOCATION = process.env.AZURE_VIDEO_INDEXER_LOCATION; 
// // const AZURE_VIDEO_INDEXER_ACCOUNT_ID = process.env.AZURE_VIDEO_INDEXER_ACCOUNT_ID
// // const app = express();
// // app.use(cors());

// // const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;

// // const containerName = "videostorage";
// // const AZURE_STORAGE_ACCOUNT_NAME=process.env.AZURE_STORAGE_ACCOUNT_NAME
// // const  AZURE_STORAGE_KEY=process.env.AZURE_STORAGE_KEY
// // const AZURE_CONGNITIVE_KEY = process.env.AZURE_CONGNITIVE_KEY;
   
// // const AZURE_CONGNITIVE_REGION = process.env.AZURE_CONGNITIVE_REGION;
// // const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_KEY);
// // const blobServiceClient = new BlobServiceClient(
// //     `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
// //     sharedKeyCredential
// // );

// // const inMemoryStorage = multer.memoryStorage();
// // const upload = multer({
// //     storage: inMemoryStorage,
// //     limits: { fileSize: 20 * 1024 * 1024 },
// //     fileFilter: function (req, file, cb) {
// //         if (file.mimetype.startsWith('video/')) {
// //             return cb(null, true);
// //         } else {
// //             cb(new Error('Only video files are allowed!'), false);
// //         }
// //     }
// // });

// // async function uploadToBlobStorage(blobName, buffer) {
// //     const uniqueBlobName = `${uuidv4()}-${blobName}`;
// //     const containerClient = blobServiceClient.getContainerClient(containerName);
// //     const blockBlobClient = containerClient.getBlockBlobClient(uniqueBlobName);
// //     await blockBlobClient.uploadData(buffer);

// //     // Generate SAS for the uploaded blob
// //     const sasOptions = {
// //         containerName: containerName,
// //         blobName: uniqueBlobName,
// //         permissions: BlobSASPermissions.parse("r"), // Set to "read" if only reading is required for transcription
// //         startsOn: new Date(),
// //         expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24 hours later
// //         protocol: "https"
// //     };

// //     const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
// //     const blobUrl = `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${uniqueBlobName}?${sasToken}`;
    
// //     return blobUrl;
// // }


// // async function transcribeFromBlob(blobUrl) {
// //     // Configure the speech client
// //     const speechConfig = speechsdk.SpeechConfig.fromSubscription(AZURE_CONGNITIVE_KEY, AZURE_CONGNITIVE_REGION);
// //     speechConfig.speechRecognitionLanguage = "en-US";
// //     // Set the initial silence timeout to 15 seconds
// //     speechConfig.setProperty(speechsdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, "3000");
// //     // Create an audio stream from the blob URL
// //     try {
// //         const pushStream = speechsdk.AudioInputStream.createPushStream();
// //         axios({
// //             method: 'get',
// //             url: blobUrl,
// //             responseType: 'stream'
// //         }).then(response => {
// //             response.data.on('data', (chunk) => {
// //                 pushStream.write(chunk);
// //             });
// //             response.data.on('end', () => {
// //                 pushStream.close();
// //             });
// //         }).catch(error => {
// //             console.error('Error fetching the blob for transcription:', error);
// //         });

// //         const audioConfig = speechsdk.AudioConfig.fromStreamInput(pushStream);
// //         const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

      
// //         recognizer.recognizeOnceAsync(result => {
// //             console.log(`Recognition Result: ${JSON.stringify(result)}`);
// //             if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
// //                 console.log(`RECOGNIZED: Text=${result.text}`);
// //             } else if (result.reason === speechsdk.ResultReason.NoMatch) {
// //                 console.log("NOMATCH: Speech could not be recognized.");
// //                 console.log("Details:", result.noMatchDetails);
// //             } else if (result.reason === speechsdk.ResultReason.Canceled) {
// //                 const cancellation = speechsdk.CancellationDetails.fromResult(result);
// //                 console.log(`CANCELED: Reason=${cancellation.reason}`);
// //                 console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
// //                 console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
// //                 console.log("CANCELED: Did you update the subscription info?");
// //             }
// //         }, (error) => {
// //             console.log("Error in recognition:", error);
// //         });
        
// //     } catch (error) {
// //         console.error('Error transcribing audio:', error);
// //     }
// // }

// // const axios = require('axios');
// // const videoIndexerApiKey = 'your_video_indexer_api_key';
// // const accountId = 'your_video_indexer_account_id';
// // const location = 'Video Indexer Location'; // e.g., "trial" or your specific location

// // async function uploadVideoToIndexer(sasUrl) {
// //     const getTokenUrl = `https://api.videoindexer.ai/auth/${location}/Accounts/${accountId}/AccessToken?allowEdit=true`;
// //     const tokenResponse = await axios.get(getTokenUrl, {
// //         headers: { 'Ocp-Apim-Subscription-Key': videoIndexerApiKey }
// //     });
// //     const accessToken = tokenResponse.data;

// //     const uploadUrl = `https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos?accessToken=${accessToken}&name=InterviewVideo&privacy=private&videoUrl=${encodeURIComponent(sasUrl)}`;
// //     const uploadResponse = await axios.post(uploadUrl);

// //     return uploadResponse.data; // Contains the ID of the indexed video and other metadata
// // }


// // async function getAccessToken(apiKey, location, accountId) {
// //     try {
// //         const response = await axios.get(`https://${location}.api.videoindexer.ai/auth/${accountId}/AccessToken`, {
// //             headers: { 'Ocp-Apim-Subscription-Key': apiKey },
// //             params: { 'allowEdit': true }
// //         });
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error retrieving access token:', error.response ? error.response.data : error.message);
// //         throw error;  // Re-throw to handle it in calling function
// //     }
// // }

// // async function uploadVideoToIndexer(videoUrl, accessToken, location, accountId) {
// //     try {
// //         const response = await axios.post(`https://${location}.api.videoindexer.ai/${accountId}/Videos`, null, {
// //             params: {
// //                 videoUrl,
// //                 accessToken,
// //                 name: 'VideoName',  // You can give any name
// //                 description: 'Video description',  // Optional
// //                 language: 'English',  // Specify the language
// //             }
// //         });
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error uploading video:', error.response ? error.response.data : error.message);
// //         throw error;  // Re-throw to handle it in calling function
// //     }
// // }

// // async function getVideoIndex(videoId, accessToken, location, accountId) {
// //     try {
// //         const response = await axios.get(`https://${location}.api.videoindexer.ai/${accountId}/Videos/${videoId}/Index`, {
// //             params: {
// //                 accessToken
// //             }
// //         });
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error getting video index:', error.response ? error.response.data : error.message);
// //         throw error;  // Re-throw to handle it in calling function
// //     }
// // }

// // async function main() {
// //     try {
// //         const accessToken = await getAccessToken(apiKey, location, accountId);
// //         const uploadResponse = await uploadVideoToIndexer(videoUrl, accessToken, location, accountId);
// //         console.log('Upload successful:', uploadResponse);

// //         const videoId = uploadResponse.id; // Extract video ID from upload response
// //         console.log('Processing video. Video ID:', videoId);

// //         // Optionally wait and then retrieve the index
// //         setTimeout(async () => {
// //             const indexResponse = await getVideoIndex(videoId, accessToken, location, accountId);
// //             console.log('Video index:', indexResponse);
// //         }, 120000); // Adjust delay based on expected processing time
// //     } catch (error) {
// //         console.error('Error in main:', error.response ? error.response.data : error.message);
// //     }
// // }










// // app.post('/upload-video', upload.single('video'), async (req, res) => {
// //     if (!req.file) return res.status(400).send('No file uploaded.');

// //     try {
// //         const blobUrl = await uploadToBlobStorage(req.file.originalname, req.file.buffer);
// //         uploadVideoToIndexer(blobUrl)
// //         // transcribeFromBlob(blobUrl);
// //         main(blobUrl)
// //         res.json({ message: 'Video uploaded and transcription started', fileName: req.file.originalname, blobUrl });
// //     } catch (error) {
// //         console.error('Error:', error);
// //         res.status(500).send(error.message);
// //     }
// // });

// // app.listen(3000, () => console.log('Server started on port 3000'));


// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const axios = require('axios');
// const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require("@azure/storage-blob");
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Environment Variables
// const AZURE_VIDEO_INDEXER_KEY = process.env.AZURE_VIDEO_INDEXER_KEY;
// const AZURE_VIDEO_INDEXER_LOCATION = process.env.AZURE_VIDEO_INDEXER_LOCATION; 
// const AZURE_VIDEO_INDEXER_ACCOUNT_ID = process.env.AZURE_VIDEO_INDEXER_ACCOUNT_ID;
// const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
// const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
// const AZURE_STORAGE_KEY = process.env.AZURE_STORAGE_KEY;

// const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_KEY);
// const blobServiceClient = new BlobServiceClient(
//     `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
//     sharedKeyCredential
// );

// const containerName = "videostorage";

// const inMemoryStorage = multer.memoryStorage();
// const upload = multer({
//     storage: inMemoryStorage,
//     limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB file size limit
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype.startsWith('video/')) {
//             cb(null, true);
//             console.log('point 1 done')
//         } else {
//             cb(new Error('Only video files are allowed!'), false);
//         }
//     }
// });

// async function uploadToBlobStorage(blobName, buffer) {
//     const uniqueBlobName = `${uuidv4()}-${blobName}`;
//     const containerClient = blobServiceClient.getContainerClient(containerName);
//     const blockBlobClient = containerClient.getBlockBlobClient(uniqueBlobName);
//     await blockBlobClient.uploadData(buffer);

//     const sasOptions = {
//         containerName: containerName,
//         blobName: uniqueBlobName,
//         permissions: BlobSASPermissions.parse("r"), 
//         startsOn: new Date(),
//         expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24 hours later
//         protocol: "https"
//     };

//     const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
//     const blobUrl = `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${uniqueBlobName}?${sasToken}`;
//     console.log('point 2 done')

//     return blobUrl;
// }

// async function getAccessToken() {
//     const tokenUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/auth/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/AccessToken?allowEdit=true`;
//     const response = await axios.get(tokenUrl, {
//         headers: { 'Ocp-Apim-Subscription-Key': AZURE_VIDEO_INDEXER_KEY }
//     });
//     console.log('point 3 done')

//     return response.data;
// }

// async function uploadVideoToIndexer(videoUrl) {
//     const accessToken = await getAccessToken();
//     const uploadUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/Videos?accessToken=${accessToken}&name=UploadedVideo&privacy=private&videoUrl=${encodeURIComponent(videoUrl)}`;
//     const uploadResponse = await axios.post(uploadUrl);
//     console.log('point 4 done')

//     return { videoId: uploadResponse.data.id, accessToken: accessToken };  // Return video ID and access token for further use
// }

// async function checkIndexingStatus(videoId, accessToken) {
//     const statusUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/Videos/${videoId}/Index?accessToken=${accessToken}`;
//     const response = await axios.get(statusUrl);
//     console.log('point 5 done')

//     return response.data;
// }

// app.post('/upload-video', upload.single('video'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         const blobUrl = await uploadToBlobStorage(req.file.originalname, req.file.buffer);
//         const { videoId, accessToken } = await uploadVideoToIndexer(blobUrl);
//         // Optionally wait a while before checking status or setup a job to check later
//         setTimeout(async () => {
//             const indexStatus = await checkIndexingStatus(videoId, accessToken);
//             console.log('Indexing status:', indexStatus);
//         }, 60000); // Check after 1 minute
//         res.json({ message: 'Video uploaded and indexing initiated', fileName: req.file.originalname, blobUrl });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send(error.message);
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const AZURE_VIDEO_INDEXER_KEY = process.env.AZURE_VIDEO_INDEXER_KEY;
const AZURE_VIDEO_INDEXER_LOCATION = process.env.AZURE_VIDEO_INDEXER_LOCATION;
const AZURE_VIDEO_INDEXER_ACCOUNT_ID = process.env.AZURE_VIDEO_INDEXER_ACCOUNT_ID;
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_KEY = process.env.AZURE_STORAGE_KEY;
console.log(AZURE_VIDEO_INDEXER_ACCOUNT_ID,'  FIRST  ',AZURE_VIDEO_INDEXER_KEY,   '  SECOND  ',AZURE_VIDEO_INDEXER_LOCATION,  '  third     ')
const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_KEY);
const blobServiceClient = new BlobServiceClient(`https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);

const containerName = "videostorage";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    }
});

async function uploadToBlobStorage(blobName, buffer) {
    try {
        const uniqueBlobName = `${uuidv4()}-${blobName}`;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(uniqueBlobName);
        await blockBlobClient.uploadData(buffer);

        const sasOptions = {
            containerName,
            blobName: uniqueBlobName,
            permissions: BlobSASPermissions.parse("r"),
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24 hours later
            protocol: "https"
        };
        
        const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
        return `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${uniqueBlobName}?${sasToken}`;
    } catch (error) {
        console.error('Failed to upload to Blob Storage:', error.message);
        throw new Error('Failed to upload video to Blob Storage.');
    }
}

async function getAccessToken() {
    try {
        const tokenUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/auth/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/AccessToken?allowEdit=true`;
        const response = await axios.get(tokenUrl, {
            headers: { 'Ocp-Apim-Subscription-Key': AZURE_VIDEO_INDEXER_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve access token:', error.message);
        throw new Error('Failed to retrieve access token for Video Indexer.');
    }
}

async function uploadVideoToIndexer(videoUrl) {
    try {
        const accessToken = await getAccessToken();
        const uploadUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/Videos?accessToken=${accessToken}&name=UploadedVideo&privacy=private&videoUrl=${encodeURIComponent(videoUrl)}`;
        const uploadResponse = await axios.post(uploadUrl);
        return { videoId: uploadResponse.data.id, accessToken };
    } catch (error) {
        console.error('Failed to upload video to indexer:', error.message);
        throw new Error('Failed to upload video to Video Indexer.');
    }
}

async function checkIndexingStatus(videoId, accessToken) {
    try {
        const statusUrl = `https://${AZURE_VIDEO_INDEXER_LOCATION}.api.videoindexer.ai/${AZURE_VIDEO_INDEXER_ACCOUNT_ID}/Videos/${videoId}/Index?accessToken=${accessToken}`;
        const response = await axios.get(statusUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to check indexing status:', error.message);
        throw new Error('Failed to check video indexing status.');
    }
}

app.post('/upload-video', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const blobUrl = await uploadToBlobStorage(req.file.originalname, req.file.buffer);
        const { videoId, accessToken } = await uploadVideoToIndexer(blobUrl);
        setTimeout(async () => {
            try {
                const indexStatus = await checkIndexingStatus(videoId, accessToken);
                console.log('Indexing status:', indexStatus);
            } catch (indexError) {
                console.error('Error during indexing status check:', indexError.message);
            }
        }, 60000); // Check after 1 minute
        res.json({ message: 'Video uploaded and indexing initiated', fileName: req.file.originalname, blobUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
