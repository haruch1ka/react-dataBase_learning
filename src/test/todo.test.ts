import { expect, it,beforeEach,afterEach } from "vitest";

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

it("test - crate a todo",async () => {
  const id = uuidv4();

  const db = new TodoTable();

  const todo = new Todo(id, "田中さんにメールする。", "20230301", "running");

  await db.createTodo(todo);

  const selectedTodo =await db.selectTodoById(id);

  expect(selectedTodo).toEqual(todo);
});

it("test - select all todos",async () => {
  const id1 = uuidv4();
  const id2 = uuidv4();

  const db = new TodoTable();

  const todos = [
    new Todo(id1, "田中さんにメールする。", "20230301", "completed"),
    new Todo(id2,"報告書を提出する。","20230301","running")
  ];

  for(let i = 0;i<todos.length; i++){
    await db.createTodo(todos[i]);
  }

  //Act
  const selectedAllTodos =await db.selectAllTodos();
  
  //Asert
  expect(selectedAllTodos).toEqual(todos);
});

it("test - a todo specified by id",async ()=>{
  //Arrange
  const id1 = uuidv4();
  const id2 = uuidv4();
  const db = new TodoTable();
  const todos = [
    new Todo(id1 , "田中さんにメールする","20230201","completed"),
    new Todo(id2,"報告書を提出する","20230301","running")
  ];
  for(let i = 0; i<todos.length; i++){
    await db.createTodo(todos[i]);
  }

  //Act 
  const selectedTodo = await db.selectTodoById(id2);

  //Asert
  expect(selectedTodo).toEqual(todos[1]);
});

it("test - todos specified by status",async ()=>{
  //Arange

  const id1 = uuidv4();
  const id2 = uuidv4();
  const id3 = uuidv4();
  const id4 = uuidv4();
  const db = new TodoTable();

  const todos = [
    new Todo(id1, "田中さんにメールする", "20230201", "completed"),
    new Todo(id2, "報告書を提出する", "20230201", "completed"),
    new Todo(id3, "会議を設定する", "20230301", "running"),
    new Todo(id4, "出張の準備をする", "20230501", "running")
  ];
  for(let i = 0; i<todos.length; i++){
    await db.createTodo(todos[i]);
  }
  
  //Act
  const runningTodos = await db.selectTodoByStatus("running");
  const completedTodos = await db.selectTodoByStatus("completed");

  //Asert
  expect(runningTodos).toEqual([todos[2],todos[3]]);
  expect(completedTodos).toEqual([todos[0],todos[1]]);
});