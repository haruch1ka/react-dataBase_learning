import React from "react";

interface CountDisplayProp {
  count: number;
}

const CountDisplay: React.FC<CountDisplayProp> = ({ count }) => {
  return <p data-testid="test-paragraph">Now Count is {count}</p>;
};

export default CountDisplay;
