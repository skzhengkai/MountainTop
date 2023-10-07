const axios = require('axios');

async function generateText(text) {
  try {
    const API_KEY = process.env['GOOGLE_APIKEY']
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const data = {
      prompt: {
        text: text,
      },
      temperature: 0.5,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
      max_output_tokens: 200,
      stop_sequences: [],
      safety_settings: [
        { category: "HARM_CATEGORY_DEROGATORY", threshold: 4 },
        { category: "HARM_CATEGORY_TOXICITY", threshold: 4 },
        { category: "HARM_CATEGORY_VIOLENCE", threshold: 4 },
        { category: "HARM_CATEGORY_SEXUAL", threshold: 4 },
        { category: "HARM_CATEGORY_MEDICAL", threshold: 2 },
        { category: "HARM_CATEGORY_DANGEROUS", threshold: 2 },
      ],
    };
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${API_KEY}`,
      data,
      config
    );
    return response.data.candidates[0].output;
  } catch (error) {
    console.error(error.response.data.error);
  }
}

module.exports = {
  generateText
}