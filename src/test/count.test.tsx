import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Count from "../component/Count";

test("When clicking the buttons, value of the count changes.", async () => {
  //Arrange
  render(<Count />);

  //Act1
  await act(() => fireEvent.click(screen.getAllByRole("button")[0]));
  await act(() => fireEvent.click(screen.getAllByRole("button")[0]));

  //Asert1
  expect(screen.getByTestId("test-paragraph")).toHaveTextContent(
    "Now Count is 2",
  );

  //Act2
  await act(() => fireEvent.click(screen.getAllByRole("button")[1]));

  //Asert2
  expect(screen.getByTestId("test-paragraph")).toHaveTextContent(
    "Now Count is 1",
  );
});
