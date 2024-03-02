import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import TodoTable from "../database/Todotable";
import Todo from "../general/Todo.ts";

const app = express();

app.use(express.json());

// CORSでhttp://localhost:3000からのリクエストを許可
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/api/todos", async (_req, res) => {
  const db = new TodoTable();
  const result = await db.selectAllTodos();
  res.status(200).json(result);
});
app.get("/api/todos/running", async (_req, res) => {
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("running");
  res.status(200).json(result);
});

app.get("/api/todos/running", async (_req, res) => {
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("running");
  res.status(200).json(result);
});
app.get("/api/todos/completed", async (_req, res) => {
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("completed");
  res.status(200).json(result);
});
app.post("/api/todos", async (req, res) => {
  const { id, content, due_date, status } = req.body;
  const todo = new Todo(id, content, due_date, status);
  const db = new TodoTable();
  await db.createTodo(todo);
  res.status(200).json(todo);
});
app.put("/api/todos", async (req, res) => {
  const { id, updateData, column } = req.body;

  const db = new TodoTable();
  await db.updateTodoById(id, updateData, column);
  res.status(200).json({ update: "complete" });
});

app.delete("/api/todos", async (req, res) => {
  const { id } = req.body;

  const db = new TodoTable();
  await db.deleteTodoById(id);
  res.status(200).json({ delete: "complete" });
});

app.patch("/api/todos", async (req, res) => {
  const { id } = req.body;
  const db = new TodoTable();
  await db.changeTodoById(id);

  res.status(200).json({ change: "complete" });
});
export default app;
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
