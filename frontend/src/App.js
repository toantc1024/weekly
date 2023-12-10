import { useEffect, useRef, useState } from "react";
import "./App.css";

import { GrDocumentCsv } from "react-icons/gr";
import { postData } from "./utils/api";
import Task from "./components/Task";
import { makeTask, scheduleStore, taskStore } from "./utils/store";
import { HiPaperAirplane, HiPlus, HiTrash } from "react-icons/hi";
import Schedule from "./components/Schedule/Schedule";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { schedule, setSchedule, clearSchedule } = scheduleStore();
  const { tasks, addTask, removeTask, updateTask, clearTasks } = taskStore();
  // Create mapping for i in day of week
  // Create mapping for i in time of day

  useEffect(() => {
    clearSchedule();
    clearTasks();
  }, []);

  const lastEle = useRef(null);
  useEffect(() => {
    lastEle.current.scrollIntoView({ behavior: "smooth" });
  }, [tasks]);
  const fileInput = useRef(null);

  return (
    <div className=" h-screen w-screen relative p-4 bg-yellow-400">
      <div className="flex h-full w-full gap-2">
        <div className="w-[210px] p-2 bg-yellow-200 rounded-lg flex flex-col gap-2">
          <div className="bg-yellow-400 text-gray-600 font-bold rounded-lg p-4 flex items-center text-[12px] justify-between">
            <h1>{tasks.length} tasks to schedule </h1>
          </div>
          <div className="h-full overflow-auto gap-2 flex flex-col">
            {tasks.map((task, key) => (
              <Task
                updateTask={updateTask}
                removeTask={removeTask}
                name={task.name}
                key={key}
                id={task.id}
                duration={task.duration}
              />
            ))}
            {/* Scroll to bottom
             */}
            <div ref={lastEle}></div>
          </div>

          <div className="flex items-center justify-between gap-2 p-2 bg-yellow-400 rounded-lg">
            <button
              className=" px-2 outline-none  bg-yellow-500 text-white hover:bg-yellow-600 transition-all ease-in-out duration-150 rounded-lg p-2"
              onClick={() => {
                addTask(makeTask("", "0:00", "0:00", 0));
              }}
            >
              <HiPlus />
            </button>

            <input
              ref={fileInput}
              className="hidden"
              type={"file"}
              accept={".csv"}
            />

            <button
              className="hidden px-2 outline-none bg-yellow-500 text-white hover:bg-yellow-600 transition-all ease-in-out duration-150 rounded-lg p-2"
              onClick={(e) => {
                e.preventDefault();
                fileInput.current.click();
                fileInput.current.onchange = async (e) => {
                  let file = e.target.files[0];
                  let reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = async (e) => {
                    let text = e.target.result;
                    let data = JSON.parse(text);
                    // let newSchedule = await postData(data);
                    console.log(data);
                    // setSchedule(newSchedule);
                  };
                };
              }}
            >
              <GrDocumentCsv />
            </button>
            <button
              className="px-2 outline-none bg-yellow-500 text-white hover:bg-yellow-600 transition-all ease-in-out duration-150 rounded-lg p-2"
              onClick={() => {
                clearTasks();
              }}
            >
              <HiTrash />
            </button>
            <button
              className="outline-none w-full flex items-center justify-center  px-0 py-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-all ease-in-out duration-150  rounded-lg"
              onClick={async () => {
                // Get tasks
                setIsLoading(true);
                let parse_schedule = [];
                Object.keys(schedule).forEach((day) => {
                  return schedule[day].forEach((task) => {
                    let _task = {
                      day: parseInt(day),
                      start: task.start,
                      end: task.end,
                      task: task.name,
                    };
                    parse_schedule.push(_task);
                  });
                });
                let parse_tasks = tasks.map((task) => {
                  return {
                    name: task.name,
                    duration:
                      task.duration === "" ? 0 : parseInt(task.duration),
                  };
                });
                let newSchedule = await postData({
                  tasks: parse_tasks,
                  schedule: parse_schedule,
                });
                setSchedule(newSchedule);
                clearTasks();
                setIsLoading(false);
              }}
            >
              <HiPaperAirplane className="rotate-[90deg] " />
            </button>
          </div>
        </div>
        <div className="relative flex h-full w-full overflow-y-auto justify-between bg-yellow-100 rounded-lg gap-4 p-2">
          {isLoading && (
            <div
              className={`fixed bg-yellow-400 absolute z-[99999] top-0 right-0 left-0 bottom-0 flex items-center justify-center transition-all ease-in-out duration-10 flex gap-2`}
            >
              <span className="animate-bounce text-4xl p-2 rounded-lg text-yellow-900 bg-yellow-200">
                ✨
              </span>
              <span className="animate-bounce text-4xl p-2 rounded-lg text-yellow-900 bg-yellow-200">
                Weekly is working on your schedule
              </span>
            </div>
          )}
          <Schedule />{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
