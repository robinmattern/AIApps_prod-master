// const axios = require('axios');
import axios from 'axios'

const openaiRequest = async () => {
  var apiKey = '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';   // error 429 too many requests
//var apiKey = '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';
  var apiUrl = 'https://api.openai.com/v1/chat/completions';

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'What is the capital of France',
      },
    ],
    temperature: 0,
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(response.data);
    
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log('Rate limit exceeded. Waiting and retrying in a minute...');
      // Wait for some time (e.g., 1 minute) and then retry
      await new Promise(resolve => setTimeout(resolve, 60000));
      await openaiRequest();
    } else {
      console.error('Error:', error.message);
    }
  }
};

openaiRequest();
