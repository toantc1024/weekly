from .day import *

weekdays = ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday']


class Week:
    def __init__(self, days=[]):
        self.days = days
        if (len(days) == 0):
            self.init_week()

    def max_tasks_per_day(self):
        value = 0
        for day in self.days:
            value = max(value, day.count_task())
        return value

    def min_tasks_per_day(self):
        total_tasks = sum(len(day.tasks) for day in self.days)
        return total_tasks

    def get_info(self):
        week_info = {}
        for i in range(0, len(self.days)):
            week_info[i] = self.days[i].get_info()
        return week_info

    def init_week(self):
        for weekday in weekdays:
            day = Day(title=weekday)
            self.days.append(day)
