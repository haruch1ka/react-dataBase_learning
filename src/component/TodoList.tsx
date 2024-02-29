import React, { useEffect } from "react";
import TodoHook from "../customHook/TodoHook.ts";
import ToRegister from "./ToRegister";
import LimitMessage from "./LimitMessage";

const TodoList: React.FC = () => {
  const runningTodosLimit: number = 5;
  const { content, SetContent, due_date, SetDueDate, CreateTodo, todos, SelectAndSetTodos } = TodoHook();

  useEffect(() => {
    SelectAndSetTodos();
  }, []);
  return (
    <>
      {runningTodosLimit > todos.length ? (
        <ToRegister
          content={content}
          SetContent={SetContent}
          due_date={due_date}
          SetDueDate={SetDueDate}
          CreateTodo={CreateTodo}
        />
      ) : (
        <LimitMessage />
      )}
    </>
  );
};

export default TodoList;
