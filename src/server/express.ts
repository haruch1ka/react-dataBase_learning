import express from "express";

//todo 
import TodoTable from "../database/TodoTable";

const app = express();

export default app;

app.get("/api/todos", async (req, res) => {
  const db = new TodoTable();
  const result = await db.selectAllTodos();
  res.status(200).json(result);
});
app.get("/api/todos/running",async(req,res)=>{
  const db = new TodoTable();
  const result = await db.selectTodoByStatus("running");
  res.status(200).json(result);
})

app.listen(3000);
