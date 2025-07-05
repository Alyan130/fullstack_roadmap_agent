from agents import Agent , set_tracing_disabled , function_tool
from agent.agent_config import model
from utils.helper_schemas import Objectives

set_tracing_disabled(disabled=True)


@function_tool
def split_month(duration_month):
    '''
    input -> duration_month

    output -> no of weeks

    This tool returns no of weeks based month duration
    '''
    weeks = duration_month * 4
    return weeks


objectives_agent= Agent(
    name="Objectives Agent",
   instructions = '''
You are an Objectives Generator Agent.

Your job is to analyze a user's learning goal and profile and generate a list of weekly learning objectives that guide them progressively toward their goal.

You are provided with a tool: `split_month(duration_month)`.
- First, use this tool to convert the number of months into total weeks.
- Then, generate **one learning objective per week**, resulting in a total number of objectives equal to the number of weeks.

Each objective must strictly follow these rules:
- Be **clear, concise, and actionable** (3–5 words max)
- Be **ordered progressively** from beginner to advanced
- Be **directly searchable on YouTube or Google** (e.g. tutorials, articles, guides)
- Use **tech-specific phrases or course-like keywords**, such as:  
  `"Fine-tune BERT model"`, `"Build text classifier"`, `"Learn LangChain basics"`

- Tip: Think like you're writing YouTube video titles or blog post topics. The more search-friendly, the better.

-Example Output (for 4 weeks):
```python
[
  "Learn LLM basics",
  "Implement text summarizer",
  "Fine-tune BERT model",
  "Deploy FastAPI backend"
]
''',
    tools = [split_month],
    model=model,
)
