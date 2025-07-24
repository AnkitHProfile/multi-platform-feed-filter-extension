chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

// Optional: re-run filter logic when navigating
chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ["content.js"]
  });
}, {
  url: [
    { urlMatches: "https://www.reddit.com/.*" },
    { urlMatches: "https://twitter.com/.*" },
    { urlMatches: "https://www.youtube.com/.*" }
  ]
});