from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from solver.algorithm import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:*",
    "https://weekly-app-sigma.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    data = body.model_dump()
    schedule_data = data["schedule"]
    tasks_to_schedule = []
    for task in data["tasks"]:
        tasks_to_schedule.append((task["name"], task["duration"]))

    problem = Problem(schedule_data=schedule_data,
                      tasks_to_schedule=tasks_to_schedule)

    solution = astar(problem)
    # for day in solution.days:
    # day.description()

    return {"solution": solution
            }
