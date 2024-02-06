const axios = require('axios');

const openaiRequest = async () => {
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

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
      console.log('Rate limit exceeded. Waiting and retrying...');
      // Wait for some time (e.g., 1 minute) and then retry
      await new Promise(resolve => setTimeout(resolve, 60000));
      await openaiRequest();
    } else {
      console.error('Error:', error.message);
    }
  }
};

openaiRequest();
