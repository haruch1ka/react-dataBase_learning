import React from "react";
import Todo from "../general/Todo";

interface RunningTodosProp {
  todos: Todo[];
}

const RunningTodos: React.FC<RunnningTodosProp> = ({ todos }) => {
  return(
    <>
      <p>進行中Todo一覧</p>
      {
        todos.map((todo,i)=>{
          <div key={todo.getId()}>
            <input 
              default ={todo.getContent()}
              type = "text"
              placeholder="registered-content"
            >
            </input>
            <input 
              defaultValue={todo.getDueDate()}
              type="text"
              placeholder = "registerd-due_date"
            >
            </input>
          </div>
        });
      }
    </>;

  ) ;
};
