import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Button from "../component/Button";
import MyTwitterAPI from "../general/MyTwitterAPI";

test("When clicking the button, twitter trends can be got.", () => {
  //Arrange
  vi.spyOn(MyTwitterAPI.prototype, "getTrends").mockReturnValue([
    "foo",
    "bar",
    "hoge",
  ]); //jest → vi
  render(<Button />);

  //Act
  fireEvent.click(screen.getByRole("button"));

  //Asert
  expect(MyTwitterAPI.prototype.getTrends).toHaveBeenCalledTimes(1);
});
