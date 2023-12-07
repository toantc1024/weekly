import { useEffect, useState } from "react";
import "./App.css";

import { getData } from "./utils/api";

function App() {
  const [schedule, setSchedule] = useState(null);
  // Create mapping for i in day of week
  // Create mapping for i in time of day
  const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="h-screen relative p-4 ">
      <button
        className="absolute top-0 right-0  p-2 bg-blue-500 text-white  rounded-lg"
        onClick={async () => {
          let newSchedule = await getData();
          setSchedule(newSchedule);
        }}
      >
        Fetch
      </button>

      <div className="flex h-full justify-between bg-yellow-100 rounded-lg gap-4 p-2">
        {schedule &&
          Object.keys(schedule.solution).map((_, i) => (
            <div className="h-full w-full flex flex-col border-[1px] bg-white rounded-lg  p-2 gap-2">
              <div className="bg-yellow-400 text-white  w-full rounded-lg p-2 flex items-center justify-center">
                {dayOfWeek[i]}
              </div>
              <div className="flex gap-2 flex-col h-full overflow-auto">
                {schedule.solution[i].map((_, j) => (
                  <div className="flex flex-col gap-2 bg-red-400 text-white  w-full rounded-lg p-2 flex items-center justify-center">
                    <span>{schedule.solution[i][j].name} </span>
                    <span>{schedule.solution[i][j].start} </span>
                    <span>{schedule.solution[i][j].end} </span>
                    <span>{schedule.solution[i][j].duration} </span>
                  </div>
                ))}

                <div className="flex flex-col gap-2 bg-red-400 text-white  w-full rounded-lg p-2 flex items-center justify-center text-8xl bg-gray-100 hover:bg-gray-200 cursor-pointer">
                  +
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
