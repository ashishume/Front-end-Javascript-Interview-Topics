// background.js - Manifest V3 Service Worker

// 1. Simulate a DLP API Call
// In production, this would be a fetch() to the Nightfall GraphQL API
async function performDLPScan(text) {
    // Simple regex simulating a Social Security Number check
    const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/;
    const hasViolation = ssnRegex.test(text);

    // Simulating network latency
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ isSafe: !hasViolation });
        }, 400);
    });
}

// 2. Listen for messages from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SCAN_TEXT') {

        // Execute the async scan
        performDLPScan(request.payload).then((result) => {
            sendResponse(result);
        }).catch(error => {
            console.error("Scan failed:", error);
            sendResponse({ isSafe: true }); // Fail open (allow traffic if API goes down)
        });

        // CRITICAL: Returning true indicates to Chrome that we will call sendResponse asynchronously.
        // If you forget this, the message channel closes immediately.
        return true;
    }
});