// Save the checkbox state to chrome.storage
document.getElementById("toggle-filter").addEventListener("change", (event) => {
  chrome.storage.local.set({ filteringEnabled: event.target.checked });
});

// Restore checkbox state on popup open
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("filteringEnabled", (data) => {
    document.getElementById("toggle-filter").checked = data.filteringEnabled || false;
  });
});