// Inject styles once per page load
function injectBadgeStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    .filter-badge {
      font-family: 'Arial', sans-serif;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 600;
      border-radius: 6px;
      margin-left: 6px;
      text-transform: uppercase;
      vertical-align: middle;
    }
    .filter-badge.safe {
      background-color: #28a745;
      color: white;
      border: 1px solid #1e7e34;
    }
    .filter-badge.unwanted {
      background-color: #dc3545;
      color: white;
      border: 1px solid #bd2130;
    }
  `;
  document.head.appendChild(style);
}

injectBadgeStyles();  // Inject badge styles at start

function createBadge(label, color) {
  const badge = document.createElement("span");
  badge.innerText = label;
  badge.className = `filter-badge ${label.toLowerCase()}`;  // apply proper class
  return badge;
}

function classifyAndFilterContent() {
  const elements = document.querySelectorAll("span, div, p");

  elements.forEach((el) => {
    const text = el.innerText.trim();
    if (!text || el.dataset.classified === "true") return;

    fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
      el.dataset.classified = "true";

      if (data.classification === "unwanted") {
        el.style.border = "2px solid red";
        el.appendChild(createBadge("UNWANTED", "red"));
      } else if (data.classification === "safe") {
        el.style.border = "2px solid green";
        el.appendChild(createBadge("SAFE", "green"));
      }
    })
    .catch(err => console.error("API error:", err));
  });
}

chrome.storage.local.get("filteringEnabled", (data) => {
  if (data.filteringEnabled) {
    classifyAndFilterContent();
  }
});