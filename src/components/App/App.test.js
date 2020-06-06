import React from "react";
import App from "./index";
import { Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

test("full app rendering/navigation", () => {
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(container.innerHTML).toMatch(/Aatm Nirbhar Bharat/);

  fireEvent.click(getByText(/search/i));
  expect(container.innerHTML).toMatch(/search code goes here/i);

  fireEvent.click(getByText(/add/i));
  expect(container.innerHTML).toMatch(/addproduct code goes here/i);

  fireEvent.click(getByText(/faq/i));
  expect(container.innerHTML).toMatch(/faq code goes here/i);

  fireEvent.click(getByText(/about/i));
  expect(container.innerHTML).toMatch(/about code goes here/i);
});

test("landing on a bad page redirects to Home", () => {
  const history = createMemoryHistory();
  history.push("/does/not/exist");
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByRole("heading")).toHaveTextContent(/Aatm Nirbhar Bharat/);
});
