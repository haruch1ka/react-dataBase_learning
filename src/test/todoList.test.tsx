import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TodoList from "../component/TodoList";

import MyFetch from "../general/MyFetch";

test("When input values to both the content-state and due_date-state,a register button is displayed.", async () => {
  //Arrange
  render(<TodoList />);

  //Act1
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newContent"), {
      target: {
        value: "田中さんにメールする",
      },
    });
  });
  //Asert1
  expect(screen.queryByTestId("register-button")).toBeNull();

  //Act2
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newDueDate"), {
      target: {
        value: "20230301",
      },
    });
  });
  //Asert2
  expect(screen.queryByTestId("register-button")).toBeTruthy();

  //Act3
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newContent"), {
      target: {
        value: "",
      },
    });
  });
  //Asert3
  expect(screen.queryByTestId("register-button")).toBeNull();
});

test("When push a register-button , the input fields of the content and due_date are cleared.", async () => {
  //Arange
  vi.spyOn(MyFetch.prototype, "createTodo").mockResolvedValue();
  render(<TodoList />);

  //Act1
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newContent"), {
      target: {
        value: "田中さんにメールする。",
      },
    });
  });
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newDueDate"), {
      target: {
        value: "20230201",
      },
    });
  });

  //Asert1
  expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(0);
  expect(screen.getByPlaceholderText("newContent")).toHaveValue(
    "田中さんにメールする。",
  );
  expect(screen.getByPlaceholderText("newDueDate")).toHaveValue("20230201");

  //Act2
  await act(() => {
    fireEvent.click(screen.queryByTestId("register-button"));
  });

  //Asert2
  expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(1);
  expect(screen.getByPlaceholderText("newContent")).toHaveValue("");
  expect(screen.getByPlaceholderText("newDueDate")).toHaveValue("");
  expect(screen.queryByTestId("register-button")).toBeNull();
});
