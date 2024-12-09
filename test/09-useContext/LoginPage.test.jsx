import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../src/09-useContext/LoginPage";

describe("Test in <LoginPage /> ", () => {
  test("should show the component without the user", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText("login-user");

    expect(preTag.innerHTML).toBe("null");
  });

  test("should called setUser when the button is clicked", () => {
    const setUser = jest.fn();
    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const btnSetUser = screen.getByLabelText("login-button");

    fireEvent.click(btnSetUser);
    // console.log(screen.debug());
    expect(setUser).toHaveBeenCalledWith({
      id: 123,
      name: "Juan",
      email: "juan@google.com",
    });
  });
});
