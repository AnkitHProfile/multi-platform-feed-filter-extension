document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleSwitch");

  // Load stored toggle state
  chrome.storage.local.get("filteringEnabled", (data) => {
    toggle.checked = Boolean(data.filteringEnabled);
  });

  // Save toggle state on change
  toggle.addEventListener("change", () => {
    chrome.storage.local.set({ filteringEnabled: toggle.checked });
  });
});