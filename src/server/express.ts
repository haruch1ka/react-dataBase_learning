import express from "express";

import TodoTable from "../database/TodoTable";



const app = express();
app.get("/api/todos", async (req, res) => {
  const db = new TodoTable();
  const result = await db.selectAllTodos();
  res.status(200).json(result);
});

app.listen(3000);

export default app;
