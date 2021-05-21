import { calculateMoonPhase } from "./MoonPhases";
import moonImg from "./moon.png";

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
export const checkUser = async (email) => {
  const response = await fetch("/users/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return response.json();
};
export const getMoonData = async (month, year) => {
  const url = `https://www.icalendar37.net/lunar/api/?lang=en&month=${
    month + 1
  }&year=${year}&size=150&lightColor=rgb(255%2C255%2C210)&shadeColor=black&texturize=false&LDZ=1619852400`;
  const moonDataFetch = await fetch(url);
  const moonData = await moonDataFetch.json();
  const formattedData = Object.keys(moonData.phase).map((phaseNumber) => {
    const phase = moonData.phase[phaseNumber];
    return {
      ...phase,
      svg: phase.svg
        .replace('width="150" height="150"', "")
        .replace(
          '<a xlink:href="https://www.icalendar37.net/lunar/app/" rel="noopener noreferrer" target="_blank">',
          "",
        )
        .replace('style="pointer-events:all;cursor:pointer" ', "")
        .replace(
          "<g>",
          `<defs>
          <pattern
            id="image11"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="100"
            width="100"
          >
            <image
              x="0"
              y="0"
              height="100"
              width="100"
              href="${moonImg}"
            ></image>
          </pattern>
        </defs>
        <g>`,
        )
        .replace(' fill="transparent" ', 'fill="url(#image11)"')
        .replace("rgb(255,255,210)", "white"),
      AlexPhase: calculateMoonPhase(phase.lighting),
      month: month,
    };
  });
  return formattedData;
};

export const addTask = async (task, date, userId) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date, userId }),
  });
  return response.json();
};

export const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
};
