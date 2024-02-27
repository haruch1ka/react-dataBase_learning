import React from "react";

interface ToRegisterProp {
  content: string;
  SetContent: (content: string) => void;
  due_date: string;
  DetDueDate: (due_date: string) => void;
}
const ToRegister: React.FC<ToRegisterProp> = ({
  content,
  SetContent,
  due_date,
  SetDueDate,
}) => {
  return (
    <div>
      <p>新規todoを入力してください</p>
      <div>
        <input
          placeholder="newContent"
          onChange={(e) => SetContent(e.target.value)}
        ></input>
      </div>

      <div>
        <input
          placeholder="newDueDate"
          onChange={(e) => SetDueDate(e.target.value)}
        ></input>
      </div>
      {content !== "" && due_date !== "" && (
        <button data-testid="register-button">foo</button>
      )}
    </div>
  );
};

export default ToRegister;
