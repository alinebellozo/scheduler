import React from "react";

/* import helper functions from the react-testing-library
  The render function allows to render Components */
import { render } from "@testing-library/react";

/* import the component being tested */
import Appointment from "components/Appointment";

/* a test that renders a React Component */
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});