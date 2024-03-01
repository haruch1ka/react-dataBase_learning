import React from "react";
import Todo from "../general/Todo";

interface RunningTodosProp {
  todos: Todo[];
  SetUpdateData: (data: string) => void;
  UpdateTodo: (id: string, column: "content" | "due_date") => void;
}

const RunningTodos: React.FC<RunningTodosProp> = ({ todos, SetUpdateData, UpdateTodo }) => {
  return (
    <>
      <p>進行中のTodo一覧</p>
      {todos.map((todo) => (
        <div key={todo.getId()}>
          <input
            type="text"
            defaultValue={todo.getContent()}
            placeholder="registered-content"
            onChange={(e) => {
              SetUpdateData(e.target.value);
            }}
            onBlur={() => {
              UpdateTodo(todo.getId(), "content");
            }}
          ></input>
          <input
            type="text"
            defaultValue={todo.getDueDate()}
            placeholder="registered-due_date"
            onChange={(e) => SetUpdateData(e.target.value)}
            onBlur={() => UpdateTodo(todo.getId(), "due_date")}
          ></input>
        </div>
      ))}
    </>
  );
};

export default RunningTodos;
