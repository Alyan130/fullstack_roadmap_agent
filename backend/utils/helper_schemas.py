from pydantic import BaseModel
from typing import List

class Objectives(BaseModel):
     objectives:List[str]
