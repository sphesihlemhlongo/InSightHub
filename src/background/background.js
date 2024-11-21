chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "summarizeText",
        title: "Summarize Selected Text",
        contexts: ["selection"]
    })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "summarizeText") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString()
      }, (results) => {
        const selectedText = results[0].result;
        chrome.runtime.sendMessage({ action: "summarize", text: selectedText });
      });
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarize") {
      const text = message.text;
  
      // Mock API Call (replace this with the actual Summarization API call)
      const mockSummarization = (input) => `${input.substring(0, 100)}... [summarized]`;
  
      const summarizedText = mockSummarization(text);
  
      // Send the summarized text back to the popup or other scripts
      sendResponse({ summary: summarizedText });
      return true; // Indicates async response
    }
  });
  