from agents import Runner
from agent.roadmap import roadmap_agent
from agent.resources import resource_agent
from agent.objectives import objectives_agent
import requests
import asyncio


async def run_agents(): 
    res = requests.get("http://127.0.0.1:8000/learning-profile")
    prompt = res.json()
    userprompt = str(prompt["data"])

    result = await Runner.run(objectives_agent,userprompt)
    lst = list(result.final_output)
    my_tup = lst[0]
    objectives = my_tup[1]
    output = ",".join(objectives)
   
   #objectives obtained

    result = await Runner.run(resource_agent,output)
    my_resoures = [r.model_dump() for r in result.final_output]

  # resources obtained
    weeks =  [w+1 for w in range(len(my_resoures))]

    final_weekly_plan = [
      {
        "week": week,
        "resource": resource
      }
      for week, resource in zip(weeks, my_resoures)
    ]
 # weekly plan list obtained
    
    roadmap_prompt = f"{userprompt}\n{str(final_weekly_plan)}"
     
    result = await Runner.run(roadmap_agent,roadmap_prompt)
    print(result.final_output.model_dump())
    data = result.final_output.model_dump()
    requests.post("http://127.0.0.1:8000/learning-roadmap",json=data)



if __name__ == "__main__":
    try:
        asyncio.run(run_agents())
    except RuntimeError as e:
        if "Cannot run the event loop while another loop is running" in str(e):
            print("An event loop is already running. This might happen in some environments (e.g., Jupyter).")
            print("Consider running your code directly in a script or stopping existing loops.")
        else:
            raise
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
