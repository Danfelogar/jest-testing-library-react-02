import { todoReducer } from "../../src/08-useReducer/todoReducer";

describe("Testing in todoReducer.js", () => {
  const INITIAL_STATE = [
    {
      id: 1,
      description: "Learn unit testing",
      done: false,
    },
  ];

  const addTodo = {
    type: "[TODO] Add Todo",
    payload: {
      id: 2,
      description: "Learn Kotlin",
      done: false,
    },
  };

  const removeTodo = {
    type: "[TODO] Remove Todo",
    payload: 1,
  };

  const toggleTodo = {
    type: "[TODO] Toggle Todo",
    payload: 1,
  };
  test("should return the initial state", () => {
    const newState = todoReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  test("should add a new todo", () => {
    const newState = todoReducer(INITIAL_STATE, addTodo);

    expect(newState.length).toBe(2);
    expect(newState).toContain(addTodo.payload);
  });

  test("should remove a todo", () => {
    const newState = todoReducer(INITIAL_STATE, removeTodo);

    expect(newState.length).toBe(0);
  });

  test("should toggle a todo", () => {
    const newState = todoReducer(INITIAL_STATE, toggleTodo);

    expect(newState[0].done).toBe(true);

    const newState2 = todoReducer(newState, toggleTodo);

    expect(newState2[0].done).toBe(false);
  });
});
