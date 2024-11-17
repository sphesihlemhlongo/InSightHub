import SummarizationService from "../services/summarizationService.js";

document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize-btn");
  const resultContainer = document.getElementById("result");

  summarizeBtn.addEventListener("click", async () => {
    const selectedText = "This is a sample text to summarize."; // Replace with real input
    const summary = await SummarizationService.summarizeText(selectedText);
    resultContainer.textContent = summary || "Failed to summarize text.";
  });
});
