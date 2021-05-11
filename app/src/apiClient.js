export const getTasks = async (date) => {
  const response = await fetch("/api/tasks");
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
