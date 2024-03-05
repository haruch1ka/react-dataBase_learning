import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import CompletedTodos from "./CompletedTodos";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </>
  );
};

export default App;
