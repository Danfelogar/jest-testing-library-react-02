import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../../src/hooks/useCounter";

describe("Testing in useCounter.js", () => {
  const val = 100;
  test("should return the value by default", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(10);
    expect(increment).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
    expect(decrement).toEqual(expect.any(Function));
  });

  test("should return the value passed by parameter", () => {
    const { result } = renderHook(() => useCounter(val));

    const { counter } = result.current;

    expect(counter).toBe(val);
  });

  test("should increment the counter by 3", () => {
    const { result } = renderHook(() => useCounter());
    const { increment } = result.current;

    act(() => {
      increment(2);
      increment();
    });

    //result.current is the correct way to access the current value of the hook for not get at falsy value
    expect(result.current.counter).toBe(13);
  });

  test("should decrement the counter by 3", () => {
    const { result } = renderHook(() => useCounter());
    const { decrement } = result.current;

    act(() => {
      decrement(2);
      decrement();
    });

    expect(result.current.counter).toBe(7);
  });

  test("should reset the counter", () => {
    const { result } = renderHook(() => useCounter());
    const { decrement, reset } = result.current;

    act(() => {
      decrement(2);
      reset();
    });

    expect(result.current.counter).toBe(10);
  });
});
