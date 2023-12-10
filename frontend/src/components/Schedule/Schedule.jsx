import React, { useEffect, useRef } from "react";
import { HiPlus } from "react-icons/hi";
import Day from "./Day";
import { makeTask, scheduleStore } from "../../utils/store";

const Schedule = () => {
  const { schedule, setSchedule, addTaskToDay } = scheduleStore();

  const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return dayOfWeek.map((day, i) => (
    <div className="h-full w-full flex flex-col border-[1px] bg-yellow-200 rounded-lg  p-2 gap-2">
      <div className="bg-yellow-400 text-white  w-full rounded-lg p-2 flex items-center justify-center font-bold">
        {day}
      </div>
      <div className="flex gap-2 flex-col h-full overflow-y-auto" id={day}>
        <Day day={i} />
      </div>
      <div
        className="flex flex-col gap-2 bg-yellow-300 text-white  w-full rounded-lg p-2 flex items-center justify-center text-2xl bg-gray-100 hover:bg-yellow-500 cursor-pointer"
        onClick={() => {
          addTaskToDay(makeTask("New Task", "5:00", "6:00", 60), i, schedule);
          // Scroll overflow-y-auto to bottom of day element
          const dayElement = document.getElementById(day);
          dayElement.scrollTo({
            top: dayElement.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        <HiPlus />
      </div>
    </div>
  ));
};

export default Schedule;
