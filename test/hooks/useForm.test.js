import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";

describe("Testing useForm.js", () => {
  const initialForm = {
    name: "John Doe",
    email: "johnDoe@gmail.com",
  };

  const newValueName = "Danfelogar";

  test("should return values by default", () => {
    const { result } = renderHook(() => useForm(initialForm));

    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });

  test("should change the name of formState", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;
    act(() => onInputChange({ target: { name: "name", value: newValueName } }));

    expect(result.current.formState).toEqual({
      ...initialForm,
      name: newValueName,
    });

    expect(result.current.formState.name).toBe(newValueName);
  });

  test("should reset the form", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onResetForm } = result.current;

    act(() => {
      onInputChange({ target: { name: "name", value: newValueName } });
      onResetForm();
    });

    expect(result.current.formState).toEqual(initialForm);
  });
});
