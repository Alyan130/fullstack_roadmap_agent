from agents import Agent , set_tracing_disabled , function_tool
import json
import httpx
from agent.agent_config import model
from models.roadmap import Resource
from dotenv import load_dotenv
import os
import requests
from typing import List
from playwright.async_api import async_playwright

load_dotenv()

set_tracing_disabled(disabled=True)
SERPER_KEY  = os.getenv("Serper_key")
MAX_RETRIES=5



async def is_valid_youtube_video(video_url: str) -> bool:
    """Check if a YouTube video is valid using oEmbed."""
    oembed_url = "https://www.youtube.com/oembed"
    params = {"url": video_url, "format": "json"}
    async with httpx.AsyncClient() as client:
        response = await client.get(oembed_url, params=params)
        return response.status_code == 200

@function_tool
async def searchYoutubeTool(query: str, max_results: int = 5):
    """Use Playwright to search YouTube and return the first valid video result."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(f"https://www.youtube.com/results?search_query={query}", timeout=60000)

        await page.wait_for_selector("ytd-video-renderer", timeout=10000)
        videos = await page.query_selector_all("ytd-video-renderer")

        results = []

        for video in videos[:max_results]:
            title_el = await video.query_selector("a#video-title")
            thumbnail_el = await video.query_selector("img")

            if not title_el or not thumbnail_el:
                continue

            title = (await title_el.get_attribute("title")) or "Untitled"
            href = await title_el.get_attribute("href")
            thumbnail_url = await thumbnail_el.get_attribute("src")

            if not href or "/watch?" not in href:
                continue

            video_url = f"https://www.youtube.com{href}"

            if await is_valid_youtube_video(video_url):
                results.append({
                    "title": title,
                    "url": video_url,
                    "thumbnail": thumbnail_url,
                    "resource_type": "video"
                })
                break 

        await browser.close()
        return results if results else [{
                    "title":"",
                    "url": "",
                    "thumbnail": "",
                    "resource_type": "video"
                }]


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
   tools=[searchWebTool,searchYoutubeTool],
   model=model
)