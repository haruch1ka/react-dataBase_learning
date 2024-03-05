import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <span>
        <p>
          <Link to={`/`}>進行中Todo一覧</Link>
        </p>
      </span>
      <span>
        <p>
          <Link to={`/completed`}>完了済みTodo一覧</Link>
        </p>
      </span>
    </div>
  );
};

export default Header;
