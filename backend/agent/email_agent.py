from agent.agent_config import model
from agents import Runner , Agent , set_tracing_disabled
from utils.pdf_create import build_pdf  
import requests
from utils.smtp_email import email_sending

set_tracing_disabled(
 disabled=True
)

async def send_email(roadmap:str,email:str)->None:

  summary_agent = Agent(
     name="Summary agent",
     instructions='''
You are a Summary Agent.

Your job is to read a roadmap structure provided as a JSON string and write a well-formatted, plain English summary.

The JSON will contain three keys:
- `weekly_plan`: list of weekly learning resources with `week`, `title`, and `resource_type`
- `week_per_skill`: optional skill objectives per week
- `skill_boost`: list of skills improved through this roadmap

Instructions:

1. Start with a heading: "Learning Roadmap Summary"
2. Then write: "This roadmap is designed to help a learner achieve their learning goal step by step."
3. Include a section titled: "Weekly Learning Plan"
   - For each `week`, create a bullet point in this format:

     Week 1:
     - Resource Type: Video
     - Title: English Tenses - Past, Present, and Future - Basic English Grammar

4. If available, include a section titled: "Weekly Objectives"
   - Format:

     Week 1 Objective: Master basic English tenses

5. At the end, include a section titled: "Skills Improved"
   - Format:

     - Tenses: +30% Confidence
     - Grammar: +25% Confidence

Rules:
- Do not use any Unicode characters or emojis. Use only plain text that is compatible with Latin-1 encoding.
- Do not return any JSON or raw data.
- Do not generate or invent any data.
- Output must be a one-page, clear, well-structured summary in natural language.
- Keep tone professional and easy to understand.

Input Format:
- You will receive the roadmap data as a string (converted JSON).

Return only the final summary as plain text. No code, JSON, or Unicode characters.
     ''',
     model=model 
   )

  result =await Runner.run(summary_agent,roadmap)
  summary = result.final_output

  pdf = build_pdf(summary)

  email_sending(pdf_bytes=pdf,to_email=email)

  


