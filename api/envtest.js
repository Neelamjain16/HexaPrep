
require('dotenv').config();

const AZURE_TEXT_ANALYTICS_ENDPOINT = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
const AZURE_COGNITIVE_KEY = process.env. AZURE_CONGNITIVE_KEY;
AZURE_TEST=process.env.AZURE_TEST
console.log(AZURE_TEST);

console.log('Endpoint:', AZURE_TEXT_ANALYTICS_ENDPOINT );
console.log('Key:',  AZURE_COGNITIVE_KEY);