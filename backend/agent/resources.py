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

YOUTUBE_KEY = os.getenv("youtube_key")
SERPER_KEY  = os.getenv("Serper_key")



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
def searchWeb(query):
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



resource_agent = Agent(
    name = "Resource Agent",
    instructions='''
You are a ResourcesAgent.

You are given a comma-separated string of learning objectives. Your task is to generate one useful resource (video or blog) for each objective.

Tool usage:
- Use `SearchYouTubeTool` for the first half of objectives
- Use `SearchWebTool` for the second half

For each objective, return a dictionary with:
- `objective`: the exact text of the objective
- `resource_type`: either "video" or "blog"
- `title`: the video or article title
- `url`: the full working link to the resource
- `thumbnail`: picture of video, you get this only from SearchYoutubeTool

Always return a list of resource dictionaries in the order the objectives were received.

-You must attach objective to each resource to detemine which resource belongs to which objective this is must.
''',
   tools=[searchWeb,SearchYouTubeTool],
   model=model,
   output_type=List[Resource]
)
