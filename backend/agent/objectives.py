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
- You are a Objectives generator agent.

- Your job is to analyze a user's learning goal and profile and generate a list of weekly learning objectives.

- You must use the provided tool `split_month(duration_month)` to first calculate the total number of weeks from the given months.
- Once you have the number of weeks, generate that many **learning objectives**, one per week.

=Each objective must:
- Be short (3 to 4 words max)
- Be relevant to the user's goal
- Be written clearly and progressively

-Final output should be only Python list of ojectives.
''',
    tools = [split_month],
    model=model,
    output_type=Objectives
)


