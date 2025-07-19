# Multi-Platform Feed Filter Extension

A privacy-first Chrome extension that filters content from X (Twitter), Reddit, and YouTube based on topic.

## Tech Stack
- Chrome Extension (JavaScript, Manifest V3)
- FastAPI (Python)
- Ollama (LLaMA 3 / Mistral 7B)
- Docker, GitHub Actions, CI/CD
- SQLite/PostgreSQL (optional)
- No tracking, no analytics, no external data collection

## Goals
- Hide or collapse content based on topic  
- No user data collected  
- Works on X, Reddit, YouTube  
- Self-hosted LLM (no paid API)

## Folder Structure
```
multi-platform-feed-filter-extension/
├── extension/        # Chrome extension code
├── backend/          # FastAPI backend service for local LLM interaction
├── .github/          # GitHub Actions workflows and CI/CD automation
├── .gitignore        # Git configuration for ignored files
├── LICENSE           # Open source license file
└── README.md         # Project documentation
```

## Project Status
This repository is currently under development. The initial file structure and configuration are complete.  
Implementation of the Chrome extension and backend classification logic will follow in the next development stages.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.