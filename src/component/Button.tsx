import React from "react";
import MyTwitterAPI from "../general/MyTwitterAPI";

const Button: React.FC = () => {
  return (
    <div>
      <div>
        <p>hello</p>
      </div>
      <button onClick={() => new MyTwitterAPI().getTrends()}>Get Trends</button>
    </div>
  );
};

export default Button;
