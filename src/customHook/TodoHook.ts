import { useState } from "react";

import Todo from "../general/Todo.ts";
import { v4 as uuidv4 } from "uuid";
import MyFetch from "../general/MyFetch";

const TodoHook = () => {
  const [content, setContent] = useState<string>("");
  const [due_date, setDueDate] = useState<string>("");
  const [todos, setTodos] = useState<[Todo[]]>([]);

  const SetContent = (content: string) => {
    setContent(content);
  };

  const SetDueDate = (due_date: string) => {
    console.log(due_date);
    setDueDate(due_date);
  };

  const CreateTodo = async () => {
    const todo = new Todo(uuidv4(), content, due_date, "running");
    const myFetch = new MyFetch("POST", "http://127.0.0.1:3000/api/todos/", todo);
    await myFetch.fetch();
    setTodos(todos.concat(todo));
    ResetContent();
    ResetDueDate();
  };

  const ResetContent = () => {
    const elemContent = document.getElementById("textareaForContent") as HTMLTextAreaElement;
    elemContent.value = "";
    setContent("");
  };

  const ResetDueDate = () => {
    const elemDueDate = document.getElementById("inputForDueDate") as HTMLInputElement;
    elemDueDate.value = "";
    setDueDate("");
  };

  const SelectAndSetTodos = async () => {
    const myFetch = new MyFetch("GET", "http://127.0.0.1:3000/api/todos/running/", null);
    const todos = await myFetch.fetch();
    setTodos(todos);
  };

  return {
    content,
    SetContent,
    due_date,
    SetDueDate,
    CreateTodo,
    todos,
    SelectAndSetTodos,
  };
};

export default TodoHook;
