export const getTasks = async (startDate, endDate) => {
  if (!endDate) {
    const response = await fetch(`/api/tasks?startDate=${startDate}`);
    return response.json();
  } else {
    const response = await fetch(
      `/api/tasks?startDate=${startDate}&endDate=${endDate}`,
    );
    return response.json();
  }
};
//get tasks by week
//startDate endDate
export const getMoonData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const addTask = async (task, date) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  return response.json();
};
