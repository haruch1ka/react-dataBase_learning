import React from "react";

interface ButtonProp {
  Increment: () => void;
  Decrement: () => void;
}

const Button: React.FC<ButtonProp> = ({ Increment, Decrement }) => {
  return (
    <div>
      <button onClick={() => Increment()}>increment</button>
      <button onClick={() => Decrement()}>decrement</button>
    </div>
  );
};
export default Button;
