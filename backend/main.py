from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from solver.algorithm import *

app = FastAPI()


class Task(BaseModel):
    name: str
    duration: int

class ScheduleItem(BaseModel):
    day: int
    task: str
    start: str
    end: str

class RequestBody(BaseModel):
    schedule: List[ScheduleItem]
    tasks: List[Task]

@app.post("/plan")
async def plan(body: RequestBody):
    data = body.dict()
    schedule_data = data["schedule"]
    tasks_to_schedule = []
    for task in data["tasks"]:
        tasks_to_schedule.append((task["name"], task["duration"]))
    
    problem = Problem(schedule_data=schedule_data, tasks_to_schedule = tasks_to_schedule)

    solution = greedybestfirstsearch(problem)
    # for day in solution.days:
        # day.description()
        
    return {"solution": solution
            
            
            }

