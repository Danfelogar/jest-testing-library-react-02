import { render, screen } from "@testing-library/react";
import { HomePage } from "../../src/09-useContext/HomePage";
import { UserContext } from "../../src/09-useContext/context/UserContext";

describe("Test in <HomePage /> ", () => {
  const user = {
    id: 1,
    name: "Danfelogar",
  };

  test("should show the component without the user", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText("pre"); //set area-label to pre tag

    expect(preTag.innerHTML).toBe("null");
  });

  test("should show the component with the user", () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText("pre");

    expect(preTag.innerHTML).toContain(user.name);
    expect(preTag.innerHTML).toContain(`${user.id}`);
    expect(preTag.innerHTML).toBe(JSON.stringify(user, null, 3));
  });
});
