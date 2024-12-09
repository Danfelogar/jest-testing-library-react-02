import { render, screen } from "@testing-library/react";
import { useTodos } from "../../src/hooks";
import { TodoApp } from "../../src/08-useReducer/TodoApp";

jest.mock("../../src/hooks/useTodos.js");
describe("Testing in <TodoApp />", () => {
  useTodos.mockReturnValue({
    todos: [
      {
        id: 1,
        description: "Learn unit testing",
        done: true,
      },
      {
        id: 2,
        description: "Learn Kotlin",
        done: false,
      },
      {
        id: 3,
        description: "Improvement english skills",
        done: false,
      },
    ],
    todosCount: 3,
    pendingTodosCount: 2,
    handleDeleteTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
    handleNewTodo: jest.fn(),
  });

  test("should show the component correctly", () => {
    render(<TodoApp />);
    // console.log(screen.debug());
    expect(screen.getByText("Learn unit testing")).toBeTruthy();
    expect(screen.getByText("Learn Kotlin")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
  });
});
