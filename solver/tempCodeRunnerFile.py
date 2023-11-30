from timedata import *
from timedata.day import convert_time
from timedata.task import Task

def test():
    w = Week()
    w.days[0].tasks.append(Task("Task 1", convert_time("10:00"), convert_time("11:00")))
        
test()