from agents import Agent , set_tracing_disabled , function_tool
import json
import httpx
from agent.agent_config import model
from models.roadmap import Resource
from dotenv import load_dotenv
import os
import requests
from typing import List

load_dotenv()

set_tracing_disabled(disabled=True)
SERPER_KEY  = os.getenv("SERPER_KEY")
YOUTUBE_KEY = os.getenv("YOUTUBE_KEY")

@function_tool
async def SearchYouTubeTool(objective: str) -> dict:
    """
    Search YouTube for a tutorial or video based on objective.
    Input -> objective
    Output -> title, url and resource type, thumbnail.
    """
    search_url = "https://www.googleapis.com/youtube/v3/search"

    params = {
        "key": YOUTUBE_KEY,
        "q": objective,
        "part": "snippet",
        "type": "video",
        "maxResults": 1
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(search_url, params=params)
        data = response.json()

        if "items" not in data or not data["items"]:
            return {
                "resource_type": "video",
                "title": "No video found",
                "url": "",
                "thumnail":""
            }

        video = data["items"][0]
        video_id = video["id"]["videoId"]
        title = video["snippet"]["title"]
        thumbnail_url = video["snippet"]["thumbnails"]["high"]["url"]

        return {
            "resource_type": "video",
            "title": title,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "thumbnail":thumbnail_url
        }


@function_tool
def searchWebTool(query):
  '''
  Search the blog on the Web based on objective.
  Input -> objective
  Output -> title, url and resource type.
  '''
  url = "https://google.serper.dev/search"

  payload = json.dumps({
    "q": f"{query}"
  })

  headers = {
  'X-API-KEY':f"{SERPER_KEY}",
  'Content-Type': 'application/json'
  }

  response = requests.request("POST", url, headers=headers, data=payload)
  result = response.json()

  if "organic" not in result:
     return "No such blogs or documents found!"

  top_result = result["organic"][0]

  return {
            "resource_type": "blog",
            "title": top_result.get("title", "Untitled"),
            "url": top_result.get("link", "")
        }


month=1
userprompt=f'''
My goal is to become a Web developer.
I have 5 years in software development experience and my key skills include context api (Expert) and
hooks (Intermediate).
I'm looking to achieve this goal within {1} months, dedicating 20 hours per week, and my
preferred learning style is hands-on projects and self-study
'''


resource_agent = Agent(
    name = "Resource Agent",
    instructions='''
You are a ResourcesAgent.

Your task is to assist in building a learning roadmap by finding one relevant resource (video or blog) for each learning objective.

---

- Tool Access:

1. searchYouTubeTool(objective: str)
   - Finds a YouTube video related to the objective.
   - Returns:
     {
       "title": "...",
       "url": "...",
       "resource_type": "video",
       "thumbnail": "..."
     }

2. searchWebTool(objective: str)
   - Finds a blog, article, or guide related to the objective.
   - Returns:
     {
       "title": "...",
       "url": "...",
       "resource_type": "blog",
       "thumbnail": "..."  # Optional
     }

---

-Tool Usage Rules:

- You will receive a **Python list of objectives**.
- For the **first half** of the list (e.g., first N//2), use **searchYouTubeTool**.
- For the **second half**, use **searchWebTool**.
- You MUST call one tool per objective. Do not mix or reverse tool usage.

---

- Restrictions:

- DO NOT fabricate or guess any resource data.
- DO NOT include any extra text, comments, headings, or explanations.
- Return the **tool’s exact output**, and attach the original objective to each result.

---
- Final Output Format:

Return a **Python list of dictionaries**, where each dictionary looks like this:

{
  "objective": "<original objective>",
  "resource_type": "video" or "blog",
  "title": "<from tool>",
  "url": "<from tool>",
  "thumbnail": "<optional, from tool>"
}

''',
   tools=[searchWebTool,SearchYouTubeTool],
   model=model
)