import { useState } from "react";

<<<<<<< HEAD
import Todo from "../general/Todo.ts";
import { v4 as uuidv4 } from "uuid";
import MyFetch from "../general/MyFetch";
=======
import MyFetch from "../general/MyFetch";
import Todo from "../general/Todo";
import { v4 as uuidv4 } from "uuid";
>>>>>>> e173d2bcd4abdac6ddece381fe3e89173ec734ef

const TodoHook = () => {
  const [content, setContent] = useState<string>("");
  const [due_date, setDueDate] = useState<string>("");

  const SetContent = (content: string) => {
    setContent(content);
  };

  const SetDueDate = (due_date: string) => {
    setDueDate(due_date);
  };

  const CreateTodo = async () => {
    const todo = new Todo(uuidv4(), content, due_date, "running");
    const myFetch = new MyFetch("POST", "http://127.0.0.1:3000/api/todos/", todo);
    await myFetch.fetch();
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

  return {
    content,
    SetContent,
    due_date,
    SetDueDate,
    CreateTodo,
  };
};

export default TodoHook;
