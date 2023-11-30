from datetime import datetime, timedelta
class Task:
    def __init__(self, name, start_time, end_time=None, duration=None):
        self.task_name = name
        self.start_time = start_time
        if(duration != None and end_time == None):
            self.end_time = start_time + timedelta(minutes=duration)
        else:
            self.end_time = end_time
        if(duration == None and end_time != None):
            self.duration = (end_time - start_time).total_seconds() / 60
        else:
            self.duration = duration
        
     
    def __lt__(self, other):
        return self.start_time < other.start_time        
    
    def description(self):
        return f'{self.task_name} - {self.start_time} -> {self.end_time} : {self.duration} minutes'
        