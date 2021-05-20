import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

const tasks = express.Router();

tasks.get("/", async (request, response) => {
  const startDate = request.query.startDate;
  const endDate = request.query.endDate;
  //condition weather request query by date or by week
  let tasks = [];
  if (!endDate) {
    tasks = await db.getTasks(startDate);
  } else {
    tasks = await db.getTasks(startDate, endDate);
  }
  console.log({ tasks });
  response.json(tasks);
});

tasks.use(express.json());
tasks.post("/", async (request, response) => {
  const { task, date } = request.body;
  const entry = await db.addTask(task, date);
  console.log({ entry });
  response.status(201).json(entry);
});
app.use(express.json());
app.post("/users/user", async (request, response) => {
  const email = request.body.email;
  console.log("Email in the post route", email);
  let user = await db.getUser(email);
  if (!user) {
    user = await db.addUser(email);
  }
  console.log({ user });
  response.json(user);
});
app.delete("/deletetask/:id", async (request, response) => {
  const id = request.body.id;
  const deletedTask = await db.deleteTask(id);
  console.log({ deletedTask });
  response.status(201).json(deletedTask);
});
app.use("/api/tasks", tasks);

process.env?.SERVE_REACT?.toLowerCase() === "true" &&
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
