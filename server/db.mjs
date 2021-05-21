import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = async (userId, startDate, endDate) => {
  if (!endDate) {
    return db.any("SELECT * FROM tasks WHERE user_id=$1 AND date=$2", [
      userId,
      startDate,
    ]);
  } else {
    return db.any(
      "SELECT * FROM tasks WHERE user_id=$1 AND date BETWEEN $2 AND $3",
      [userId, startDate, endDate],
    );
  }
};

export const addTask = async (task, date, userId) => {
  const day = new Date(date);
  return (
    await db.any(
      "INSERT INTO tasks(task,date,user_id) VALUES($1,$2,$3) RETURNING id, task, date, user_id",
      [task, day, userId],
    )
  )[0];
};
export const getUser = (email) => {
  return db.oneOrNone("SELECT * FROM users WHERE account=$1 LIMIT 1", [email]);
};

export const addUser = async (email) => {
  const day = new Date();
  return (
    await db.any(
      "INSERT INTO users(account,date_joined) VALUES($1,$2) RETURNING id",
      [email, day],
    )
  )[0];
};
export const deleteTask = async (id) => {
  return await db.any("DELETE FROM tasks WHERE id = $1;", [id]);
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
