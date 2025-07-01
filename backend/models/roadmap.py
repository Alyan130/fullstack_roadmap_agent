from pydantic import BaseModel
from typing import List , Optional

class Resource(BaseModel):
    resource_type:str
    title:str
    url:str
    thumbnail:Optional[str]=None


class WeeklyPlan(BaseModel):
    week:int
    resource:Resource

class WeekPerSkill(BaseModel):
    week:int
    objective:str

class SkillBoost(BaseModel):
     name:str
     confidence:int


class Roadmap(BaseModel):
    weekly_plan:List[WeeklyPlan]
    week_per_skill:List[WeekPerSkill]
    skill_boost:List[SkillBoost]
    