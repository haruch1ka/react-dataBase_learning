//server
import app from "../server/express";

// //Todo
import TodoTable from "../database/TodoTable";
import Todo from "../general/Todo";
import TodoUpDateData from "../general/TodoUpDateData";
import TodoDeleteData from "../general/TodoDeleteData";
import TodoChangeData from "../general/TodoChangeData";

import request from "supertest";

import { v4 as uuidv4 } from "uuid";

const clearDB = new TodoTable();
beforeEach(async () => {
  await clearDB.deleteAllTodos();
});
afterEach(async () => {
  await clearDB.deleteAllTodos();
});

test("The GET Method to the /api/todos can be got all todos.", async () => {
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

test("The GET Method to the /api/todos/running can be got all running-todos.", async () => {
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
  const response = await request(app).get("/api/todos/running").set("Accept", "application/json");
  // //Asert
  expect(response.status).toEqual(200);
  expect(JSON.parse(response.text)).toEqual([todos[2], todos[3]]);
});

test("The GET Method to the /api/todos/completed can be got all completed-todos.", async () => {
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

test("POST method to /api/todos can be created a todo.", async () => {
  //Arenge
  const id = uuidv4();
  const todo = new Todo(id, "会議を設定する", "20230401", "running");
  const db = new TodoTable();

  //Act
  const response = await request(app).post("/api/todos").send(todo).set("Accept", "application/json");

  const selectedTodo = await db.selectTodoById(id);

  //Assert
  expect(response.status).toEqual(200);
  expect(selectedTodo).toEqual(todo);
});

test("PUT method to /api todos can update the todo ", async () => {
  //Arrange
  const id1 = uuidv4();
  const id2 = uuidv4();
  const db = new TodoTable();
  const todos = [
    new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
    new Todo(id2, "報告書を提出する。", "20230301", "completed"),
  ];
  for (let i = 0; i < todos.length; i++) {
    await db.createTodo(todos[i]);
  }

  const todoUpDateData1 = new TodoUpDateData(id1, "山本さんにメールする", "content");
  const todoUpDateData2 = new TodoUpDateData(id2, "20230401", "due_date");

  //Act
  const response1 = await request(app).put("/api/todos").send(todoUpDateData1).set("Accept", "application/json");
  const selectedTodo1 = await db.selectTodoById(id1);

  // // //Act2
  const response2 = await request(app).put("/api/todos").send(todoUpDateData2).set("Accept", "application/json");
  const selectedTodo2 = await db.selectTodoById(id2);

  //Asert
  expect(response1.status).toEqual(200);
  expect(selectedTodo1).toEqual(new Todo(id1, "山本さんにメールする", "20230201", "completed"));

  // //Asert
  expect(response2.status).toEqual(200);
  expect(selectedTodo2).toEqual(new Todo(id2, "報告書を提出する。", "20230401", "completed"));
});

test("DELTE method to /api/todos can table the todo", async () => {
  //Arange
  const db = new TodoTable();
  const id = uuidv4();
  const todo = new Todo(id, "田中さんにメールする", "20230201", "running");
  await db.createTodo(todo);
  const todoDeleteData = new TodoDeleteData(id);

  //Act
  const response = await request(app).delete("/api/todos").send(todoDeleteData).set("Accept", "application/json");
  const todos = await db.selectAllTodos();

  //Asert
  expect(response.status).toEqual(200);
  expect(todos).toEqual([]);
});

test("PATCH method to /api/todos can be changed the status of the todo.", async () => {
  //Arange
  const db = new TodoTable();
  const id = uuidv4();
  const todo = new Todo(id, "田中さんにメールする", "20230201", "running");
  await db.createTodo(todo);
  const todoChangeData = new TodoChangeData(id);

  //Act
  const response = await request(app).patch("/api/todos").send(todoChangeData).set("Accept", "application/json");

  const selectedTodo = await db.selectTodoById(id);

  //Asert
  expect(response.status).toEqual(200);
  expect(selectedTodo).toEqual(new Todo(id, "田中さんにメールする", "20230201", "completed"));
});
