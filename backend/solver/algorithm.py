from .timedata import *
from .timedata.day import convert_time
from .timedata.task import Task
import pandas as pd
from .node import Node
import heapq


class Problem:
    def __init__(self, schedule_data=[], tasks_to_schedule=[]):
        self.week = Week()
        self.tasks_to_schedule = tasks_to_schedule
        self.load_tasks(schedule_data)

    def load_tasks(self, schedule_data):
        for schedule in schedule_data:
            day = schedule["day"]
            task = schedule["task"]
            start = convert_time(schedule["start"])
            end = convert_time(schedule["end"])

            self.week.days[day].add_task(Task(task, start, end))


def getSolution(week):
    return week.get_info()


def bfs(problem):
    start_node = Node(parent=None, week=problem.week,
                      tasks_to_schedule=problem.tasks_to_schedule)

    frontier = [start_node]
    explored = []

    while len(frontier) > 0:
        node = frontier.pop(0)
        explored.append(node)

        if node.goal_test():
            return getSolution(node.week)

        for child in node.expand():

            if child not in explored or child not in frontier:
                frontier.append(child)
            break

    return None  # Failure


def astar(problem):
    start_node = Node(parent=None, week=problem.week,
                      tasks_to_schedule=problem.tasks_to_schedule)

    frontier = [(start_node.f, start_node)]
    explored = []

    while len(frontier) > 0:
        node = heapq.heappop(frontier)[1]
        print(node.week.days)
        explored.append(node)

        if node.goal_test():
            return getSolution(node.week)

        for child in node.expand():
            if child not in explored:
                heapq.heappush(frontier, (child.f, child))

    return None  # Failure
