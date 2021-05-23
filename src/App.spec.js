import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

test("renders search repository home page", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Repositories/i);
  expect(linkElement).toBeInTheDocument();
});
