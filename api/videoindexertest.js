require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.AZURE_VIDEO_INDEXER_KEY;
const location = process.env.AZURE_VIDEO_INDEXER_LOCATION; 
const accountId = process.env.AZURE_VIDEO_INDEXER_ACCOUNT_ID;
const videoUrl = 'https://youtu.be/QOAr74xCkjA?si=Gok9JXeeT5tloCJN';  // This URL needs to be a direct video file URL, not a YouTube link

async function getAccessToken(apiKey, location, accountId) {
    try {
        const response = await axios.get(`https://${location}.api.videoindexer.ai/auth/${accountId}/AccessToken`, {
            headers: { 'Ocp-Apim-Subscription-Key': apiKey },
            params: { 'allowEdit': true }
        });
        return response.data;
    } catch (error) {
        console.error('Error retrieving access token:', error.response ? error.response.data : error.message);
        throw error;  // Re-throw to handle it in calling function
    }
}

async function uploadVideoToIndexer(videoUrl, accessToken, location, accountId) {
    try {
        const response = await axios.post(`https://${location}.api.videoindexer.ai/${accountId}/Videos`, null, {
            params: {
                videoUrl,
                accessToken,
                name: 'VideoName',  // You can give any name
                description: 'Video description',  // Optional
                language: 'English',  // Specify the language
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading video:', error.response ? error.response.data : error.message);
        throw error;  // Re-throw to handle it in calling function
    }
}

async function getVideoIndex(videoId, accessToken, location, accountId) {
    try {
        const response = await axios.get(`https://${location}.api.videoindexer.ai/${accountId}/Videos/${videoId}/Index`, {
            params: {
                accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting video index:', error.response ? error.response.data : error.message);
        throw error;  // Re-throw to handle it in calling function
    }
}

async function main() {
    try {
        const accessToken = await getAccessToken(apiKey, location, accountId);
        const uploadResponse = await uploadVideoToIndexer(videoUrl, accessToken, location, accountId);
        console.log('Upload successful:', uploadResponse);

        const videoId = uploadResponse.id; // Extract video ID from upload response
        console.log('Processing video. Video ID:', videoId);

        // Optionally wait and then retrieve the index
        setTimeout(async () => {
            const indexResponse = await getVideoIndex(videoId, accessToken, location, accountId);
            console.log('Video index:', indexResponse);
        }, 120000); // Adjust delay based on expected processing time
    } catch (error) {
        console.error('Error in main:', error.response ? error.response.data : error.message);
    }
}

main();
