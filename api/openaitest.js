
require('dotenv').config()
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT
const azureApiKey = process.env.AZURE_OPENAI_API_KEY
  console.log(azureApiKey)
  console.log(endpoint)
const messages = [
  { role: "user", content: "give me five react question" },
];

async function main() {
  console.log("== Chat Completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-4";
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };