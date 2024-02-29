import React from "react";
import Todo from "../general/Todo";

interface RunningTodosProp {
  todos: Todo[];
}

const RunningTodos: React.FC<RunningTodosProp> = ({ todos }) => {
  return (
    <>
      <p>進行中のTodo一覧</p>
      {todos.map((todo) => (
        <div>
          <input type="text" defaultValue={todo.getId()} placeholder="registered-content"></input>
          <input type="text" defaultValue={todo.getId()} placeholder="registered-due_date"></input>
        </div>
      ))}
    </>
  );
};

export default RunningTodos;
