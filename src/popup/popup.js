import SummarizationService from "../services/summarizationService.js";

document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize-btn");
  const resultContainer = document.getElementById("result");

  summarizeBtn.addEventListener("click", async () => {
    try {
      // Get the currently highlighted text from the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Inject a script to get the selected text
      const [response] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString(), // Function to get selected text
      });

      const selectedText = response.result;

      if (!selectedText) {
        resultContainer.textContent = "No text selected.";
        return;
      }

      // Use SummarizationService (ensure it’s imported)
      const summary = await SummarizationService.summarizeText(selectedText);
      resultContainer.textContent = summary || "No summary available.";
    } catch (error) {
      console.error("Error fetching highlighted text:", error);
      resultContainer.textContent = "An error occurred.";
    }
  });
});
