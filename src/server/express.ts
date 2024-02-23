import express from "express";

import TodoTable from "../database/TodoTable";
import Todo from "../general/Todo";

const app = express();
app.use(express.json()); // body-parser settings

app.get("/api/todos", async (req, res) => {
  const db = new TodoTable();
  const result = await db.selectAllTodos();
  res.status(200).json(result);
});

app.get("/api/todos/running", async (req, res) => {
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("running");
  res.status(200).json(result);
});
app.get("/api/todos/completed", async (req, res) => {
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("completed");
  res.status(200).json(result);
});
app.post("/api/todos", async (req, res) => {
  console.log(req.body);
  const { id, content, due_date, status } = req.body;
  const todo = new Todo(id, content, due_date, status);
  const db = new TodoTable();
  await db.createTodo(todo);
  res.status(200).json(todo);
});

export default app;
app.listen(3000);
