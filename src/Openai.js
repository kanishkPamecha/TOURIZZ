const axios = require('axios');

// Set your OpenAI API key
const apiKey = 'YOUR_API_KEY';

function generateTravelResponse(userInput) {
  // Define a prompt that emphasizes the travel context
  const prompt = `Travel Q&A: ${userInput}\nAnswer:`;

  // Call the OpenAI API to generate a response
  return axios.post(
    'https://api.openai.com/v1/engines/text-davinci-002/completions',
    {
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
      n: 1, // Number of completions to generate
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    }
  )
  .then(response => response.data.choices[0].text.trim())
  .catch(error => {
    console.error('Error generating response:', error.response ? error.response.data : error.message);
    return 'Sorry, an error occurred while generating the response.';
  });
}

// Main loop to take user input and generate responses
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput() {
  rl.question('User: ', (userInput) => {
    // Exit the loop if the user types 'exit'
    if (userInput.toLowerCase() === 'exit') {
      rl.close();
    } else {
      // Generate and print the assistant's response
      generateTravelResponse(userInput)
        .then(assistantResponse => {
          console.log(`Assistant: ${assistantResponse}`);
          getUserInput(); // Continue with the next user input
        })
        .catch(err => console.error('Error:', err));
    }
  });
}

// Start the conversation
getUserInput();
