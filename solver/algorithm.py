from timedata import *
from timedata.day import convert_time
from timedata.task import Task
import pandas as pd
from node import Node
import heapq


class Problem:
    def __init__(self, schedule_file='./data/schedule.csv', task_to_schedule=[]):
        self.week = Week()
        self.task_to_schedule = task_to_schedule
        self.load_tasks(schedule_file)
        
    
    def load_tasks(self, schedule_file):
        df = pd.read_csv(schedule_file)
        for i in range(0, len(df)):
            data = []
            for j in range(0, len(df.iloc[i])):
                data.append(df.iloc[i].iloc[j])

            day = data[0]
            task_name = data[1]
            start_time = convert_time(data[2])
            end_time = convert_time(data[3])
            
            self.week.days[day].add_task(Task(task_name, start_time, end_time))
        
def bfs(problem):
    start_node = Node(parent=None, week=problem.week, task_to_schedule=problem.task_to_schedule)
    
    frontier = [start_node]
    explored = []
    
    
    while len(frontier) > 0:
        node = frontier.pop(0)
        explored.append(node)
        
        if node.goal_test():
            return node.week
        
        for child in node.expand():
         
            if child not in explored or child not in frontier:
                frontier.append(child)
            break
        
    return None #Failure


def greedybestfirstsearch(problem):
    start_node = Node(parent=None, week=problem.week, task_to_schedule=problem.task_to_schedule)
    
    frontier = [(start_node.f, start_node)]
    explored = []
    
    
    while len(frontier) > 0:
        node = heapq.heappop(frontier)[1]
        explored.append(node)
        
        if node.goal_test():
            return node.week
        
        for child in node.expand():
            if child not in explored:
                heapq.heappush(frontier, (child.f, child))
        
    return None #Failure

problem = Problem(schedule_file='./data/schedule.csv', task_to_schedule = [
    ("Học Toán 1", 100),
    ("Xem phim Coraline", 150),
])

solution = greedybestfirstsearch(problem)
for day in solution.days:
    day.description()