// summarizationService.js

const SummarizationService = (() => {
    const API_URL = "https://developer.chrome.com/"; 
    require('dotenv').config();
    const API_TOKEN = process.env.API_TOKEN;
  
    // Function to call the Summarization API
    async function summarizeText(text) {
      try {
        if (!text) {
          throw new Error("No text provided for summarization.");
        }
  
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`, // Add token here
          },
          body: JSON.stringify({ text }), // Replace with the required body format
        });
  
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
  
        const data = await response.json();
        return data.summary; // Adjust to match the API's response structure
      } catch (error) {
        console.error("Error summarizing text:", error.message);
        return `Error: ${error.message}`;
      }
    }
  
    return {
      summarizeText,
    };
  })();
  
  if (typeof module !== "undefined") {
    module.exports = SummarizationService;
  }
  