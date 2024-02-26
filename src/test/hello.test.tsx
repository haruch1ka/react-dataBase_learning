import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; ///vitest → vitestでjest-domを使う設定
import Hello from "../component/Hello.tsx";

test("The Hello-Component displays paragraph.", () => {
  //Arrange
  render(<Hello />);

  //Act
  expect(screen.getByTestId("test-paragraph")).toHaveTextContent("Hello");
});
