import { render, screen } from "@testing-library/react";
import { MainApp } from "../../src/09-useContext/MainApp";
import { MemoryRouter } from "react-router-dom";

describe("Testing in <MainApp />", () => {
  test("should render the Home page", () => {
    render(
      //MemoryRouter is used to simulate the routing in the test for no use BrowserRouter that is only use in the browser at not the console
      <MemoryRouter>
        <MainApp />
      </MemoryRouter>
    );

    expect(screen.getByText("HomePage")).toBeTruthy();
  });

  test("should show the LoginPage", () => {
    render(
      //initial entries is used for simulate the route that we want to test
      <MemoryRouter initialEntries={["/login"]}>
        <MainApp />
      </MemoryRouter>
    );

    expect(screen.getByText("LoginPage")).toBeTruthy();
    console.log(screen.debug());
  });
});
