from .timedata.day import convert_time
from datetime import timedelta
from .timedata.task import Task
from .timedata.week import Week
import copy
from .timedata.week import weekdays

TIME_RANGE = 30
START_TIME = "7:00"
END_TIME = "22:00"


def sort_key(day):
    return (len(day.tasks), weekdays.index(day.title))


class Node:
    def __init__(self, parent=None, week=[], tasks_to_schedule=[]):
        # parent node
        self.parent = parent
        # state
        self.week = week
        self.tasks_to_schedule = tasks_to_schedule
        # Costs
        self.g = 0
        self.h = 0
        self.f = 0

    def __lt__(self, other):
        return self.f < other.f

    def expand(self):
        childrens = []

        # Improvement: Sort current_week.days array that has less tasks and Monday->Sunday
        # Priority: Weekday that has less tasks and Monday->Sunday

        for task in self.tasks_to_schedule:
            # Priority: Weekday that has less tasks
            current_week = copy.deepcopy(self.week)

            copy_current_week = copy.deepcopy(current_week)
            copy_current_week.days.sort(key=sort_key)

            traverse_order = []
            for i in range(0, len(copy_current_week.days)):
                traverse_order.append(weekdays.index(
                    copy_current_week.days[i].title))

            for _ in range(0, len(traverse_order)):
                i = traverse_order[_]
                # Who want to start a day at specific time? User.
                start_time = convert_time(START_TIME)
                # User will set specific time that they don't want to add any task!
                end_day = convert_time(END_TIME)

                while (start_time < end_day):
                    new_week = copy.deepcopy(current_week)
                    new_task = Task(
                        name=task[0], start_time=start_time, duration=task[1])
                    can_add = new_week.days[i].add_task(new_task)
                    if (new_task.end_time > convert_time(END_TIME)):
                        can_add = False

                    if (can_add):
                        new_tasks_to_schedule = self.tasks_to_schedule.copy()
                        new_tasks_to_schedule.remove(task)
                        new_node = Node(parent=self, week=new_week,
                                        tasks_to_schedule=new_tasks_to_schedule)
                        # new_node.g = len(new_tasks_to_schedule)
                        new_node.g = 0
                        new_node.h = current_week.min_tasks_per_day()
                        new_node.f = new_node.g + new_node.h

                        childrens.append(new_node)

                    # Add 30 minutes to start_time
                    start_time = start_time + timedelta(minutes=TIME_RANGE)
        return childrens

    def goal_test(self):
        return len(self.tasks_to_schedule) == 0
