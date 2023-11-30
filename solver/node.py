from timedata.day import convert_time
from datetime import timedelta
from timedata.task import Task
from timedata.week import Week
import copy

TIME_RANGE = 30
START_TIME = "7:00"
END_TIME = "22:00"

class Node:
    def __init__(self, parent=None, week=[], task_to_schedule=[]):
        # parent node
        self.parent = parent
        # state
        self.week = week 
        self.task_to_schedule = task_to_schedule
        # Costs
        self.g = 0
        self.h = 0
        self.f = 0
        
    def __lt__(self, other):
        return self.f < other.f
    
    
    def expand(self):
        childrens = []
        for task in self.task_to_schedule:
            for i in range(0, len(self.week.weekdays)):
                # Who want to start a day at specific time? User.
                start_time = convert_time(START_TIME)
                # User will set specific time that they don't want to add any task!
                end_day = convert_time(END_TIME)
                
                while(start_time < end_day):
                    new_week = copy.deepcopy(self.week)
                    new_task = Task(name=task[0], start_time=start_time, duration=task[1])
                    can_add = new_week.days[i].add_task(new_task)
                    if(new_task.end_time > convert_time(END_TIME)):
                        can_add = False
                    
                    if(can_add):
                        new_task_to_schedule = self.task_to_schedule.copy()
                        new_task_to_schedule.remove(task)
                        new_node = Node(parent=self, week=new_week, task_to_schedule=new_task_to_schedule)
                        # new_node.g = len(new_task_to_schedule)
                        new_node.h = self.week.total_tasks()
                        new_node.f = new_node.g + new_node.h 
                        
                        childrens.append(new_node)
                    
                    # Add 30 minutes to start_time
                    start_time = start_time + timedelta(minutes=TIME_RANGE)
        return childrens
    
    def goal_test(self):
        return len(self.task_to_schedule) == 0
    
    
    
    
        
        
        