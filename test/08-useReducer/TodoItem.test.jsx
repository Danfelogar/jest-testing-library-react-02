import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe("Testing in <TodoItem />", () => {
  const todo = {
    id: 1,
    description: "Learn unit testing",
    done: false,
  };

  const onDeleteTodoMock = jest.fn();
  const onToggleTodoMock = jest.fn();

  //if you using more mock functions, you can use beforeEach for clear mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the Todo  pending for complete", () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    );

    const liElement = screen.getByRole("listitem");
    // screen.debug();
    expect(liElement.className).toBe(
      "list-group-item d-flex justify-content-between"
    );

    const spanElement = screen.getByLabelText("span");

    expect(spanElement.className).toContain("align-self-center");

    expect(spanElement.className).not.toContain("text-decoration-line-through");
  });

  test("should show the Todo completed", () => {
    //bad practice, but for this example is ok
    todo.done = true;

    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    );

    const spanElement = screen.getByLabelText("span");

    expect(spanElement.className).toContain("text-decoration-line-through");
  });

  test("should must call the function ToggleTodo when click on span", () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    );

    const spanElement = screen.getByLabelText("span");

    fireEvent.click(spanElement);

    //calling with the id of the todo in this case 1
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
  });

  test("should must call the function onDeleteTodo when click on button", () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    );

    const btnDelete = screen.getByLabelText("btn-delete");

    fireEvent.click(btnDelete);

    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
  });
});
