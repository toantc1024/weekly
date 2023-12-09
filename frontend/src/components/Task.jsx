import React, { useEffect, useState } from "react";
import { HiCheck, HiSave, HiSaveAs, HiX } from "react-icons/hi";
import { distance, taskStore } from "../utils/store";
const Task = ({ id, name, duration, start, end, updateTask, removeTask }) => {
  const [taskName, setTaskName] = useState(name);
  const [startTask, setStartTask] = useState(start);
  const [endTask, setEndTask] = useState(end);
  const [taskDuration, setTaskDuration] = useState(duration);

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (
      taskName !== name ||
      taskDuration !== duration ||
      startTask !== start ||
      endTask !== end
    ) {
      updateTask(id, {
        name: taskName,
        duration: taskDuration,
        start: startTask,
        end: endTask,
      });
      // setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [taskName, taskDuration]);

  return (
    <div
      className={`text-[10px] bg-yellow-100 mx-1 text-yellow-800 rounded-lg p-2 flex flex-col gap-2 border-[2px] ${
        isChanged ? "border-yellow-400" : "border-yellow-200"
      }`}
    >
      <div className="flex justify-end gap-2  group">
        {isChanged && (
          <button
            className="w-[30px] h-[30px] rounded-full bg-yellow-200 hover:bg-yellow-400 hover:text-white flex items-center justify-center "
            onClick={() => {
              // setIsChanged(false);
            }}
          >
            <HiCheck />
          </button>
        )}
        <button
          className="bg-transparent border-[1px] border-yellow-200  w-[30px] h-[30px] rounded-full bg-yellow-200 hover:bg-red-400 hover:text-white flex items-center justify-center "
          onClick={() => {
            removeTask(id);
          }}
        >
          <HiX />
        </button>
      </div>
      <div className="flex gap-2 items-center ">
        <span>Task:</span>
        <input
          className="w-full bg-yellow-200 outline-none rounded-lg p-1 focus:bg-yellow-300 transition-all ease-in-out duration-150"
          type="text"
          required
          placeholder="Enter name"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
      </div>
      {start && (
        <div className="flex gap-2 items-center ">
          <span>Start:</span>
          <input
            className="w-full bg-yellow-200 outline-none rounded-lg p-1 focus:bg-yellow-300 transition-all ease-in-out duration-150"
            type="text"
            required
            value={startTask}
            placeholder="Enter start"
            onChange={(e) => {
              setStartTask(e.target.value);
            }}
          />
        </div>
      )}
      {end && (
        <div className="flex gap-2 items-center ">
          <span>End:</span>
          <input
            className="w-full bg-yellow-200 outline-none rounded-lg p-1 focus:bg-yellow-300 transition-all ease-in-out duration-150"
            type="text"
            value={endTask}
            required
            placeholder="Enter end"
            onChange={(e) => {
              setEndTask(e.target.value);
            }}
          />
        </div>
      )}
      <div className="flex gap-2 items-center ">
        <span>Duration:</span>
        <input
          className="w-full bg-yellow-200 outline-none rounded-lg p-1 focus:bg-yellow-300 transition-all ease-in-out duration-150"
          type="number"
          required
          value={taskDuration}
          placeholder="Enter duration"
          onChange={(e) => {
            setTaskDuration(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
