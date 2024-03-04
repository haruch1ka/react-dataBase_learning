import React, { useEffect } from "react";
import TodoHook from "../customHook/TodoHook.ts";
import ToRegister from "./ToRegister";
import LimitMessage from "./LimitMessage";
import RunningTodos from "./RunningTodos";

const TodoList: React.FC = () => {
  const runningTodosLimit: number = 5;
  const {
    content,
    SetContent,
    due_date,
    SetDueDate,
    CreateTodo,
    todos,
    SelectAndSetTodos,
    SetUpdateData,
    UpdateTodo,
    DeleteTodo,
  } = TodoHook();

  useEffect(() => {
    SelectAndSetTodos();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <RunningTodos todos={todos} SetUpdateData={SetUpdateData} UpdateTodo={UpdateTodo} DeleteTodo={DeleteTodo} />
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
