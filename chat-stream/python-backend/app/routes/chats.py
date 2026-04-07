from fastapi import APIRouter, Request
import json
from sse_starlette.sse import EventSourceResponse
from dotenv import load_dotenv
import httpx
import os

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

router = APIRouter()


async def stream_openrouter(messages):

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",  # optional but recommended
        "X-Title": "My Chat App",
    }

    payload = {"model": "openai/gpt-4o-mini", "messages": messages, "stream": True}

    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream(
            "POST", OPENROUTER_API_URL, headers=headers, json=payload
        ) as response:
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data = line.replace("data: ", "").strip()
                    if data == "[DONE]":
                        break
                    yield data


@router.post("/stream")
async def chat_stream(request: Request):
    body = await request.json()
    messages = body.get("messages", [])

    async def event_generator():
        try:

            async for chunk in stream_openrouter(messages):
                if chunk:
                    try:
                        json_data = json.loads(chunk)
                        if json_data.get("choices"):
                            delta = json_data["choices"][0].get("delta", {})
                            if "content" in delta:
                                yield {"event": "message", "data": delta["content"]}
                    except json.JSONDecodeError:
                        continue
        except Exception as exc:
            yield {"event": "error", "data": str(exc)}

    return EventSourceResponse(event_generator())


# @router.get("/")
# async def get_chats(request: Request):
#     return {"chats": []}
