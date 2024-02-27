import React from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./component/TodoList";

const root = createRoot(document.getElementById("root"));

root.render(<TodoList />);
