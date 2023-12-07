export const getData = async () => {
  const response = await fetch(
    `${
      process.env.REACT_APP_IS_PRODUCTION
        ? process.env.REACT_APP_BACKEND_ENDPOINT_DEV
        : process.env.REACT_APP_BACKEND_ENDPOINT_PROD
    }/plan`,
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
  return data;
};
