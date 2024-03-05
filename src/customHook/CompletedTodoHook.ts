import { useState } from "react";
import MyFetch from "../general/MyFetch";
import Todo from "../general/Todo";

const CompletedTodoHook = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const SelectAndSetTodos = async () => {
    const myFetch = new MyFetch("GET", "http://127.0.0.1:3000/api/todos/completed/", null);
    const todos = await myFetch.fetch();
    setTodos(todos);
  };

  return {
    todos,
    SelectAndSetTodos,
  };
};

export default CompletedTodoHook;
