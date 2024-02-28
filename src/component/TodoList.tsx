import React from "react";
import TodoHook from "../customHook/TodoHook.ts";
import ToRegister from "./ToRegister";

const TodoList: React.FC = () => {
  const { content, SetContent, due_date, SetDueDate, CreateTodo } = TodoHook();

  return (
    <>
      <ToRegister content={content} SetContent={SetContent} due_date={due_date} SetDueDate={SetDueDate} CreateTodo={CreateTodo} />
    </>
  );
};

export default TodoList;
