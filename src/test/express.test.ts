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

it("The GET Method to the /api/todos/running can be got all running-todos.", async () => {
  //Arrange
  const id1 = uuidv4();
  const id2 = uuidv4();
  const id3 = uuidv4();
  const id4 = uuidv4();
  const db = new TodoTable();
  const todos = [
    new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
    new Todo(id2, "報告書を提出する。", "20230301", "completed"),
    new Todo(id3, "会議を設定する。", "20230401", "running"),
    new Todo(id4, "出張の準備をする。", "20230501", "running"),
  ];
  for (let i = 0; i < todos.length; i++) {
    await db.createTodo(todos[i]);
  }
  // //Act
  const response = await request(app).get("/api/todos/running").set("Accept", "application/json")
  // //Asert
  expect(response.status).toEqual(200);
  expect(JSON.parse(response.text)).toEqual([todos[2], todos[3]]);
});

it("The GET Method to the /api/todos/completed can be got all completed-todos.", async () => {
  //Arrange
  const id1 = uuidv4();
  const id2 = uuidv4();
  const id3 = uuidv4();
  const id4 = uuidv4();
  const db = new TodoTable();
  const todos = [
    new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
    new Todo(id2, "報告書を提出する。", "20230301", "completed"),
    new Todo(id3, "会議を設定する。", "20230401", "running"),
    new Todo(id4, "出張の準備をする。", "20230501", "running"),
  ];
  for (let i = 0; i < todos.length; i++) {
    await db.createTodo(todos[i]);
  }

  //Act
  const response = await request(app).get("/api/todos/completed").set("Accept", "application/json");

  //Asert
  expect(response.status).toEqual(200);
  expect(JSON.parse(response.text)).toEqual([todos[0], todos[1]]);
});

it("POST method to /api/todos can be created a todo." ,async ()=>{
  //Arenge
  const id = uuidv4();
  const todo  =  new Todo(id,"会議を設定する","20230401","running");
  const db = new TodoTable();

  //Act
  const response = await request(app)
  .post("/api/todos")
  .send(todo)
  .set('Accept','application/json');

  const selectedTodo = await db.selectTodoById(id);

  //Assert
  expect(response.status).toEqual(200);
  expect(selectedTodo).toEqual(todo);
});