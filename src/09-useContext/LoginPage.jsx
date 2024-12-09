import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <h1>LoginPage</h1>
      <hr />

      <pre aria-label="login-user">{JSON.stringify(user, null, 3)}</pre>

      <button
        aria-label="login-button"
        className="btn btn-primary"
        onClick={() =>
          setUser({ id: 123, name: "Juan", email: "juan@google.com" })
        }
      >
        Establecer usuario
      </button>
    </>
  );
};
