import { useEffect } from "react";
import "./App.css";

function App() {
  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT_DEV}/plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule: [
            {
              day: 0,
              start: "7:00",
              end: "8:50",
              task: "Physicology",
            },
            {
              day: 1,
              start: "7:00",
              end: "8:50",
              task: "Physicology B",
            },
            {
              day: 1,
              start: "9:00",
              end: "10:50",
              task: "Physicology C",
            },
          ],
          tasks: [
            {
              name: "Watch Coraline",
              duration: 150,
            },
          ],
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    // getData();
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          getData();
        }}
      >
        Fetch
      </button>
    </div>
  );
}

export default App;
