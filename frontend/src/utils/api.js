import { generateUUID } from "./uuid";

const addId = (data) => {
  let res = {};
  Object.keys(data).forEach((key) => {
    if (!res[key]) res[key] = [];
    data[key].forEach((item) => {
      item["id"] = generateUUID();
      res[key].push(item);
    });
  });
  return res;
};
export const postData = async ({ tasks, schedule }) => {
  console.log("Calling api", tasks, schedule);
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_MODE === "DEVELOPMENT"
          ? process.env.REACT_APP_BACKEND_ENDPOINT_DEV
          : process.env.REACT_APP_BACKEND_ENDPOINT_PROD
      }/plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule,
          tasks,
        }),
      }
    );

    const data = await response.json();
    let solution = addId(data.solution);
    return solution;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
