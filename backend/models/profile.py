from pydantic import BaseModel
from typing import List , Literal

class Skill(BaseModel):
     name:str
     level: Literal["Beginner","Intermediate","Advanced"]

class Profile(BaseModel):
    goal:str
    skill:List[Skill]
    experience:str
    duration_month:int
    weekly_hours:int
    learning_style:str

