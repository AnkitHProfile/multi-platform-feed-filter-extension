from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# Enable CORS (for development; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin(s) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class TextInput(BaseModel):
    text: str

@app.post("/classify")
async def classify_text(payload: TextInput):
    prompt = f"Classify this text as either 'unwanted' or 'safe': {payload.text}"

    # Send request to Ollama API
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "mistral",
                    "prompt": prompt,
                    "stream": False
                },
                timeout=20.0
            )
            response.raise_for_status()
    except httpx.HTTPStatusError as e:
        print(f"[HTTP Error] {e.response.status_code}: {e.response.text}")
        return {"error": f"Ollama returned HTTP {e.response.status_code}"}
    except Exception as e:
        print(f"[Connection Error] Failed to connect to Ollama: {str(e)}")
        return {"error": "Unexpected backend failure"}

    # Parse and return response
    try:
        result = response.json()
        generated_text = result.get("response", "").strip().lower()

        # Optional postprocessing (simple classification)
        if "unwanted" in generated_text:
            label = "unwanted"
        elif "safe" in generated_text:
            label = "safe"
        else:
            label = "unknown"

        return {"classification": label, "raw": generated_text}
    except Exception as e:
        print(f"[Parsing Error] Invalid response format: {str(e)}")
        return {"error": "Invalid response format from backend"}