import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "your_database_user",
    password: "your_database_password",
    database: "your_database_name",
  },
});

// Example: Insert data
const insertUser = async () => {
  try {
    await db("users").insert({ name: "John", email: "john@example.com" });
    console.log("User inserted");
  } catch (err) {
    console.error(err);
  }
};

// Example: Read data
const getUser = async () => {
  try {
    const users = await db("users").where("name", "John");
    console.log(users);
  } catch (err) {
    console.error(err);
  }
};

insertUser();
getUser();
