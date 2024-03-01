import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import TodoList from "../component/TodoList";
import Todo from "../general/Todo";

import MyFetch from "../general/MyFetch";

beforeAll(() => {
  vi.spyOn(MyFetch.prototype, "createTodo").mockResolvedValue();
  vi.spyOn(MyFetch.prototype, "selectAllRunningTodos").mockResolvedValue([]);
  vi.spyOn(MyFetch.prototype, "updateTodo").mockResolvedValue();
});
beforeEach(() => {
  cleanup();
});

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
  await act(() => fireEvent.click(screen.queryByTestId("register-button")));

  //Asert2
  //expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(1);
  expect(screen.getByPlaceholderText("newContent")).toHaveValue("");
  expect(screen.getByPlaceholderText("newDueDate")).toHaveValue("");
  expect(screen.queryByTestId("register-button")).toBeNull();
});
test("When push a register-button , if the running todos is maximun limit , the LimitMessage Component is displayed", async () => {
  //Arrange
  const todos = [
    new Todo("1", "田中さんにメールする。", "20230201", "running"),
    new Todo("2", "報告書を提出する。", "20230301", "running"),
    new Todo("3", "会議を設定する。", "20230401", "running"),
    new Todo("4", "出張の準備をする。", "20230501", "running"),
  ];
  vi.spyOn(MyFetch.prototype, "selectAllRunningTodos").mockResolvedValue(todos);
  render(<TodoList />);

  //Act
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newContent"), {
      target: {
        value: "経費を精算する。",
      },
    });
  });
  await act(() => {
    fireEvent.change(screen.getByPlaceholderText("newDueDate"), {
      target: {
        value: "20230301",
      },
    });
  });
  await act(() => fireEvent.click(screen.queryByTestId("register-button")));

  //Asert
  expect(screen.queryByTestId("limit-message")).toBeTruthy();
});

test("when render the RunningTodos-Component,all running-todos is displayed", async () => {
  //Arrange
  const todos = [
    new Todo("1", "田中さんにメールする。", "20230201", "running"),
    new Todo("2", "報告書を提出する。", "20230301", "running"),
  ];
  vi.spyOn(MyFetch.prototype, "selectAllRunningTodos").mockResolvedValue(todos);
  //Act
  await act(() => render(<TodoList />));
  const contentFields = screen.getAllByPlaceholderText("registered-content");
  const dueDateFields = screen.getAllByPlaceholderText("registered-due_date");

  //Asert
  expect(MyFetch.prototype.selectAllRunningTodos).toHaveBeenCalledTimes(1);
  expect(contentFields.length).toBe(2);
  expect(dueDateFields.length).toBe(2);
  expect(contentFields[0]).toHaveValue("田中さんにメールする。");
  expect(contentFields[1]).toHaveValue("報告書を提出する。");
  expect(dueDateFields[0]).toHaveValue("20230201");
  expect(dueDateFields[1]).toHaveValue("20230301");
});

test("When unfocus a form after editing the content or due_data of a todo , it is updated", async () => {
  //Arange
  const todos = [new Todo("1", "報告書を提出する。", "20230301", "running")];
  vi.spyOn(MyFetch.prototype, "selectAllRunningTodos").mockResolvedValue(todos);

  await act(() => render(<TodoList />));
  const contentElem = screen.getByPlaceholderText("registered-content");
  const dueDateElem = screen.getByPlaceholderText("registered-due_date");

  //Act1
  await act(() => contentElem.focus());
  await act(() => dueDateElem.focus());

  //Asert1
  expect(MyFetch.prototype.updateTodo).toHaveBeenCalledTimes(0);

  //Act2
  await act(() => userEvent.type(contentElem, "大西課長に。"));

  await act(() => {
    dueDateElem.focus();
  });

  //Asert2
  expect(dueDateElem).toHaveFocus();
  expect(MyFetch.prototype.updateTodo).toHaveBeenCalledTimes(1);
});
