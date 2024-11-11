import { getSummary } from '../services/summarizationService.js';

document.getElementById("fetchSummary").addEventListener("click", async () => {
  const result = await getSummary("Sample text for summarization");
  document.getElementById("output").textContent = result || "Summary fetched!";
});
