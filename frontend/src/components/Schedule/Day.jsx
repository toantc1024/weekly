import React from "react";
import Task from "../Task";
import { scheduleStore } from "../../utils/store";
const Day = ({ day }) => {
  const { schedule, removeTaskFromDay, updateTaskFromDay } = scheduleStore();

  const updateTask = (id, task) => {
    console.log("updateTask");
    updateTaskFromDay(id, task, day, schedule);
  };
  const removeTask = (id) => {
    removeTaskFromDay(id, day, schedule);
  };
  return (
    schedule &&
    schedule[day] &&
    schedule[day].map((task) => (
      <Task
        id={task.id}
        name={task.name}
        start={task.start}
        end={task.end}
        duration={task.duration}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    ))
  );
};

export default Day;
