import axios from 'axios';

const openaiKey = process.env.REACT_APP_OPENAI_API_KEY;

export async function generateImage(prompt) {
  const url = 'https://api.openai.com/v1/images/generations';

  try {
    const response = await axios.post(url,
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error in OpenAI Image Generation: ${error}`);
    throw error;
  }
}

export function isConfigured() {
    return process.env.REACT_APP_OPENAI_API_KEY !== undefined;
}