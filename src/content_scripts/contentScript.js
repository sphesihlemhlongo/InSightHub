// content_scripts/contentScript.js

// Listen for messages from the background or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check for specific actions
    if (request.action === "summarizeText") {
        summarizePageContent();
        sendResponse({status: "Summarizing the page content"});
    } else if (request.action === "rewriteText") {
        rewritePageContent(request.rewriteStyle);
        sendResponse({status: "Rewriting the page content"});
    }
    return true;
});

// Function to summarize the page content
function summarizePageContent() {
    const textContent = document.body.innerText;
    
    // Assume we will send this to the Summarization API
    chrome.runtime.sendMessage({action: "summarizeAPI", text: textContent}, (summary) => {
        // Replace body content with summary for testing purposes
        document.body.innerHTML = `<div style="font-size: 1.5em; padding: 20px;">${summary}</div>`;
    });
}

// Function to rewrite the page content in a specified style
function rewritePageContent(style) {
    const textContent = document.body.innerText;

    // Assume we will send this to the Rewrite API with the desired style
    chrome.runtime.sendMessage({action: "rewriteAPI", text: textContent, style: style}, (rewrittenText) => {
        // Replace body content with rewritten text for testing purposes
        document.body.innerHTML = `<div style="font-size: 1.5em; padding: 20px;">${rewrittenText}</div>`;
    });
}
