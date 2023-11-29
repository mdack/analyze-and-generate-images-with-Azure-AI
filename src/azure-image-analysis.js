import axios from 'axios';

const subscriptionKey = process.env.REACT_APP_AZURE_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

export async function analyzeImage(imageUrl) {
  const url = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people`;

  try {
    const response = await axios.post(url,
      {
        url: imageUrl
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error in Azure Image Analysis: ${error}`);
    throw error;
  }
}

export function isConfigured() {
    return (process.env.REACT_APP_AZURE_COMPUTER_VISION_SUBSCRIPTION_KEY !== undefined && process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT !== undefined);
}