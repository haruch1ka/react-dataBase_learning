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

it("test",async () => {
  const id = uuidv4();

  const db = new TodoTable();

  const todo = new Todo(id, "田中さんにメールする。", "20230301", "running");

  await db.createTodo(todo);

  const selectedTodo =await db.selectTodoById(id);

  expect(selectedTodo).toEqual(todo);
});
