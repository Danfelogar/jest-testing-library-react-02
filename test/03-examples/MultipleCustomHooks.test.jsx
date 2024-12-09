import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples";
//scoping the exact path for no iteration more than must be
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock("../../src/hooks/useCounter");
jest.mock("../../src/hooks/useFetch");

describe("Testing in <MultipleCustomHooks />", () => {
  const mockIncrement = jest.fn();

  useCounter.mockReturnValue({
    counter: 1,
    increment: mockIncrement,
    decrement: jest.fn(),
    reset: jest.fn(),
  });

  //beforeEach is a function that will be and do the same before each test
  beforeEach(() => {
    //clear all the mocks
    jest.clearAllMocks();
  });

  test("should display the component correctly", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    expect(screen.getByText("Loading..."));
    expect(screen.getByText("BreakingBad Quotes"));

    const nextBtn = screen.getByRole("button", { name: "Next quote" });
    expect(nextBtn.disabled).toBeTruthy();
  });

  test("should show a Quote", () => {
    //remember simulate the components the more atomic possible
    useFetch.mockReturnValue({
      data: [{ author: "Fernando", quote: "Hola Mundo" }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    // screen.debug();

    expect(screen.getByText("Hola Mundo")).toBeTruthy();
    expect(screen.getByText("Fernando")).toBeTruthy();

    const nextBtn = screen.getByRole("button", { name: "Next quote" });
    expect(nextBtn.disabled).toBeFalsy();
  });

  test("should call incremental function", () => {
    useFetch.mockReturnValue({
      data: [{ author: "Fernando", quote: "Hola Mundo" }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    const nextBtn = screen.getByRole("button", { name: "Next quote" });

    fireEvent.click(nextBtn);

    expect(mockIncrement).toHaveBeenCalled();
  });
});
