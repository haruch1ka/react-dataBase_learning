//test
import { expect, it, beforeEach, afterEach } from "vitest";
import request from "supertest";

//server
import app from "../server/express";

//Todo
import TodoTable from "../database/TodoTable";
import Todo from "../general/Todo";
import { v4 as uuidv4 } from "uuid";

const clearDB = new TodoTable();
beforeEach(async () => {
  await clearDB.deleteAllTodos();
});
afterEach(async () => {
  await clearDB.deleteAllTodos();
});

it("The GET Method to the /api/todos can be got all todos.", async () => {
  //Arrange
  const id1 = uuidv4();
  const id2 = uuidv4();
  const db = new TodoTable();
  const todos = [
    new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
    new Todo(id2, "報告書を提出する。", "20230301", "running"),
  ];
  for (let i = 0; i < todos.length; i++) {
    await db.createTodo(todos[i]);
  }

  //Act
  const response = await request(app).get("/api/todos").set("Accept", "application/json");

  //Asert
  expect(response.status).toEqual(200);
  expect(JSON.parse(response.text)).toEqual(todos);
});