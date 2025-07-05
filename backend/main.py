from agents import Runner
from agent.roadmap import roadmap_agent
from agent.resources import resource_agent
from agent.objectives import objectives_agent


async def run_agents(data): 

    result = await Runner.run(objectives_agent,data)
    # lst = list(result.final_output)
    # my_tup = lst[0]
    # objectives = my_tup[1]
    output = result.final_output
   
   #objectives obtained

    result = await Runner.run(resource_agent,output)
    my_resoures = [r for r in result.final_output]

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
    
    roadmap_prompt = f"{data}\n{str(final_weekly_plan)}"
     
    result = await Runner.run(roadmap_agent,roadmap_prompt)
    final_data = result.final_output.model_dump()
    return final_data

