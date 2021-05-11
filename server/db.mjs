import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = async (date) =>
  await db.any("SELECT * FROM tasks WHERE date=date");
//week get dates[0] dates[6] and query the range

export const addTask = async (task) => {
  const today = new Date();
  const user_id = 1;

  (
    await db.any(
      "INSERT INTO tasks(task,date,user) VALUES($1,$2,$3) RETURNING id, task, date, user_id",
      [task, today, user_id],
    )
  )[0];
};
function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "tpl2_2021h1",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
