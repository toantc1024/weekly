import { create } from "zustand";
import { generateUUID } from "./uuid";

const convert = (x) => {
  // Convert 6:00 to minutes
  let time = x.split(":");
  return parseInt(time[0]) * 60 + parseInt(time[1]);
};

export const distance = (a, b) => {
  // Calculate distance between two times
  return convert(a) - convert(b);
};

export const makeTask = (
  name,
  start = undefined,
  end = undefined,
  duration = 0
) => {
  // Map through params and create object
  return {
    start: start,
    end: end,
    name: name,
    duration: duration,
    id: generateUUID(),
  };
};

export const taskStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: (id, task) => {
    set((state) => {
      console.log(state.tasks);
      return {
        tasks: state.tasks.map((t) => (t.id === id ? task : t)),
      };
    });
  },
  clearTasks: () => set({ tasks: [] }),
}));

export const scheduleStore = create((set) => ({
  schedule: {},
  setSchedule: (schedule) => set({ schedule: schedule }),
  clearSchedule: () => set({ schedule: {} }),
  addTaskToDay: (task, day, schedule) => {
    if (!schedule) {
      schedule = {};
    }
    let dayTask = schedule[day] ? schedule[day] : [];
    dayTask.push(task);
    let newSchedule = schedule;
    newSchedule[day] = dayTask;
    set({ schedule: newSchedule });
  },
  removeTaskFromDay: (id, day, schedule) => {
    let dayTask = schedule[day] ? schedule[day] : [];
    dayTask = dayTask.filter((task) => task.id !== id);
    let newSchedule = schedule;
    newSchedule[day] = dayTask;
    set({ schedule: newSchedule });
  },
  updateTaskFromDay: (id, task, day, schedule) => {
    console.log(schedule);
    let dayTask = schedule[day] ? schedule[day] : [];
    dayTask = dayTask.map((t) => (t.id === id ? task : t));
    let newSchedule = schedule;
    newSchedule[day] = dayTask;
    set({ schedule: newSchedule });
  },
  clearTasksFromDay: (day, schedule) => {
    let newSchedule = schedule;
    newSchedule[day] = [];
    set({ schedule: newSchedule });
  },
  clearAllTasks: () => set({ schedule: {} }),
}));
