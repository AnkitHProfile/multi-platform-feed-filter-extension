// Checks and hides all <span> or <div> containing unwanted topics (placeholder)
const unwantedKeywords = ["politics", "celebrity", "drama"];

function hideUnwantedContent() {
  const elements = document.querySelectorAll("span, div, p");
  elements.forEach((el) => {
    const text = el.innerText.toLowerCase();
    if (unwantedKeywords.some(keyword => text.includes(keyword))) {
      el.style.display = "none";
    }
  });
}

// Run only if filtering is enabled
chrome.storage.local.get("filteringEnabled", (data) => {
  if (data.filteringEnabled) {
    hideUnwantedContent();
  }
});