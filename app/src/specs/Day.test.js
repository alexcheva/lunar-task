import React from "react";
import * as td from "testdouble";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Day from "../components/Day";
require("testdouble-jest")(td, jest);

let realFetch;
const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route path="/">{children}</Route>
  </MemoryRouter>
);
const mockTasks = [
  {
    id: 1,
    task: "sup",
  },
];
const dayObj = {
  AlexPhase: "Waning Gibbous",
  dayWeek: 5,
  dis: 369274.1144178808,
  isPhaseLimit: false,
  lighting: 71.66113800724114,
  month: 4,
  npWidget: "Waning (71%)",
  phaseName: "Waning",
  svg:
    '<svg  viewBox="0 0 100 100"><defs>\n          <pattern\n            id="image11"\n            x="0"\n            y="0"\n            patternUnits="userSpaceOnUse"\n            height="100"\n            width="100"\n          >\n            <image\n              x="0"\n              y="0"\n              height="100"\n              width="100"\n              href="/static/media/moon.03804d5d.png"\n            ></image>\n          </pattern>\n        </defs>\n        <g><circle cx="50" cy="50" r="49" stroke="none"  fill="black"/><path d="M 50 1 A 49,49 0 1,0 49,99 A -20.58,49 0 1,0 50,1" stroke-width="0" stroke="none" fill="white" /><circle cx="50" cy="50" r="49" stroke-width="0"  fill="url(#image11)"/></a></g></svg>',
  svgMini: false,
  timeEvent: false,
};
const fakeGetTasks = () => {
  return mockTasks;
};
// td.replace("../apiClient", {
//   getTasks: fakeGetTasks,
// });
beforeEach(() => {
  realFetch = window.fetch;
  window.fetch = td.func();
  td.when(window.fetch(td.matchers.anything())).thenReturn({
    json: () => {
      return mockTasks;
    },
  });
});
afterEach(() => {
  window.fetch = realFetch;
  cleanup();
});

describe("Day", () => {
  it("rendered successfully", async () => {
    const user = Promise.resolve({ id: 1 });
    const routerDay = (
      <RenderWithRouter>
        <Day initialData={[dayObj]} userId={user} />
      </RenderWithRouter>
    );
    render(routerDay);
    const dayComponent = await screen.findByText("Moon Phase:");
    //expect(dayComponent).toBeInTheDocument();
    console.log(dayComponent);
  });
});
