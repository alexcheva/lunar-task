import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

const tasks = express.Router();

tasks.get("/", async (request, response) => {
  const userId = request.query.u;
  const startDate = request.query.startDate;
  const endDate = request.query.endDate;
  let tasks = [];
  if (!endDate) {
    tasks = await db.getTasks(userId, startDate);
  } else {
    tasks = await db.getTasks(userId, startDate, endDate);
  }
  response.json(tasks);
});

tasks.use(express.json());
tasks.post("/", async (request, response) => {
  const { task, date, userId } = request.body;
  const entry = await db.addTask(task, date, userId);
  response.status(201).json(entry);
});
app.use(express.json());

app.post("/users/user", async (request, response) => {
  const email = request.body.email;
  let user = await db.getUser(email);
  console.log(user);
  if (!user) {
    user = await db.addUser(email);
  }
  response.json(user);
});
tasks.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await db.deleteTask(id);
  response.end();
});
app.use("/api/tasks", tasks);

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
