import pandas as pd
from .day import *
from .task import Task
import sys


class Week:
    def __init__(self, days=[]):
        self.weekdays = ["Thứ 2", "Thứ 3", "Thứ 4",
                         "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
        self.days = days
        if (len(days) == 0):
            self.init_week()

    def max_tasks_per_day(self):
        value = 0
        for day in self.days:
            value = max(value, day.count_task())
        return value

    def get_info(self):
        week_info = {}
        for i in range(0, len(self.days)):
            week_info[i] = self.days[i].get_info()
        return week_info

    def init_week(self):
        for weekday in self.weekdays:
            day = Day(title=weekday)
            self.days.append(day)
