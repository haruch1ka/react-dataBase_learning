import React, { useEffect } from "react";
import CompletedTodoHook from "../customHook/CompletedTodoHook";
import Header from "./Header";

const CompletedTodo: React.FC = () => {
  const { todos, SelectAndSetTodos } = CompletedTodoHook();

  useEffect(() => {
    SelectAndSetTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <p>完了済みTodo一覧</p>
      <div>
        {todos.map((todo) => (
          <div>
            <span>{todo.getContent()}</span>
            <span>{todo.getDueDate()}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CompletedTodo;
