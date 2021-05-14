export const getTasks = async (date) => {
  const response = await fetch("/api/tasks?date=2021-05-12");
  return response.json();
};

//get tasks by week
//startDate endDate
export const getMoonData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const addTask = async (task) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  return response.json();
};
