
require('dotenv').config();
const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const AZURE_TEXT_ANALYTICS_ENDPOINT = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
const AZURE_COGNITIVE_KEY = process.env.AZURE_CONGNITIVE_KEY;

// Initialize the Text Analytics client
const textAnalyticsClient = new TextAnalyticsClient(
    AZURE_TEXT_ANALYTICS_ENDPOINT,
    new AzureKeyCredential(AZURE_COGNITIVE_KEY)
);

const documents = [
    'React is a JavaScript library for building user interfaces. It is declarative, efficient, and flexible. React is used to build single-page applications. React makes it easy to create interactive UIs by using a component-based approach. Components are reusable pieces of code that can be combined to create complex UIs'
];

async function main() {
    try {
        const sentimentResults = await textAnalyticsClient.analyzeSentiment(documents);
        for (const result of sentimentResults) {
            if (!result.error) {
                console.log("Document ID:", result.id);
                console.log("Overall sentiment:", result.sentiment);
                console.log("Scores:", result.confidenceScores);
            } else {
                console.error("Encountered an error:", result.error);
            }
        }
        const keyPhrasesResults = await textAnalyticsClient.extractKeyPhrases(documents);
        for (const result of keyPhrasesResults) {
            if (!result.error) {
                console.log("Document ID:", result.id);
                console.log("Key Phrases:", result.keyPhrases);
            } else {
                console.error("Encountered an error:", result.error);
            }
        }
    } catch (error) {
        console.error("Encountered an error during text analytics:", error);
    }
}

main();
