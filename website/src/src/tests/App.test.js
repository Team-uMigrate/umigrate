import React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";

test("renders text", () => {
  const { getByText } = render(<div>hello</div>);
  const element = getByText(/hello/i);
  expect(element).toBeInTheDocument();
});
