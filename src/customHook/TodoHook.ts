import { useState } from "react";

const TodoHook = () => {
  const [content, setContent] = useState<string>("");
  const [due_date, setDueDate] = useState<string>("");

  const SetContent = (content: string) => {
    setContent(content);
  };

  const SetDueDate = (due_date: string) => {
    setDueDate(due_date);
  };

  return {
    content,
    SetContent,
    due_date,
    SetDueDate,
  };
};

export default TodoHook;
