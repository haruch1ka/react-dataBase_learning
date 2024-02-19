import express from "express";

const app = express();

app.get("/api/todos", (req, res) => {
  res.send("こんにちは　せかい");
});

app.listen(3000);
