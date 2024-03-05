import React from "react";
import Todo from "../general/Todo";

interface RunningTodosProp {
  todos: Todo[];
  SetUpdateData: (data: string) => void;
  UpdateTodo: (id: string, column: "content" | "due_date") => void;
  DeleteTodo: (id: string) => void;
  ChangeTodo: (id: string) => void;
}
const RunningTodos: React.FC<RunningTodosProp> = ({ todos, SetUpdateData, UpdateTodo, DeleteTodo, ChangeTodo }) => {
  return (
    <>
      <p>進行中のTodo一覧</p>
      {todos.map((todo, i) => (
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
          <button data-testid={`delete-button${i}`} onClick={() => DeleteTodo(todo.getId())}>
            削除
          </button>
          <button data-testid={`complete-button${i}`} onClick={() => ChangeTodo(todo.getId())}>
            完了
          </button>
        </div>
      ))}
    </>
  );
};

export default RunningTodos;
