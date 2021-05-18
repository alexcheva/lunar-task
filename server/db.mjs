import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = async (startDate, endDate) => {
  if (!endDate) {
    return db.any("SELECT * FROM tasks WHERE date=$1", [startDate]);
  } else {
    return db.any("SELECT * FROM tasks WHERE date BETWEEN $1 AND $2", [
      startDate,
      endDate,
    ]);
  }
  //week get dates[0] dates[6] and query the range
  //getTasks(new Date(2021, 4, 12)).then((result) => console.log(result));
};
//get tasks by week
export const addTask = async (task) => {
  const today = new Date();
  const user_id = 1;

  return (
    await db.any(
      "INSERT INTO tasks(task,date,user_id) VALUES($1,$2,$3) RETURNING id, task, date, user_id",
      [task, today, user_id],
    )
  )[0];
};
function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
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
