from agents import set_tracing_disabled ,AsyncOpenAI,OpenAIChatCompletionsModel
from dotenv import load_dotenv
import os

load_dotenv()

set_tracing_disabled(disabled=True)

API_KEY = os.getenv("GEMINI_KEY")


external_client = AsyncOpenAI(
    api_key=API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=external_client
)
