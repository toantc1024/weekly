import bisect
from datetime import datetime, time


def convert_time(time_str):
    """ 
        Convert time string to datetime object
        12:20 -> 20/11/2023 ... 12:20
    """
    current_date = datetime.now().date()
    hour, minute = map(int, time_str.split(':'))
    date_time = datetime.combine(current_date, time(hour, minute))
    return date_time


class Day():
    def __init__(self, title):
        self.title = title
        self.tasks = []

    def is_conflict(self, task1, task2):
        return not (task1.end_time < task2.start_time or task1.start_time > task2.end_time)

    def conflicts_with_existing(self, new_task):
        for task in self.tasks:
            if (self.is_conflict(task, new_task)):
                return True
        return False

    def add_task(self, new_task):
        # Check if new_task isn't alreay in the list
        for task in self.tasks:
            if (task.task_name == new_task.task_name and task.start_time == new_task.start_time and task.end_time == new_task.end_time):
                return False

        if (not self.conflicts_with_existing(new_task)):
            bisect.insort(self.tasks, new_task)
            return True
        return False

    def count_task(self):
        return len(self.tasks)

    def get_info(self):
        day_info = []
        for task in self.tasks:
            day_info.append(task.get_info())
        return day_info

    def description(self):
        print("{} has {} tasks".format(self.title, len(self.tasks)))

        for task in self.tasks:
            print(task.description())
