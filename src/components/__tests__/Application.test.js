/* Rendering `<Application />` down below, so we need React.createElement */
import React from "react";
import axios from "axios";

/* Import helper functions from the react-testing-library. The render function allows to render Components */

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

/* Import the component being tested */

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  // test #1
  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  // test #2
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  // test #3
  it(
    "loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
      // 1. Render the Application.
      const { container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click the "Delete" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        (appointment) => queryByText(appointment, "Archie Cohen"));
        
      fireEvent.click(queryByAltText(appointment, "Delete"));

      // 4. Check that the confirmation message is shown.
      expect(
        getByText(
          appointment,
          "Are you sure you want to delete this interview?"
        )
      ).toBeInTheDocument();

      // 5. Click the "Confirm" button on the confirmation.
      fireEvent.click(queryByText(appointment, "Confirm"));

      // 6. Check that the element with the text "Deleting" is displayed.
      expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

      // 7. Wait until the element with the "Add" button is displayed.
      await waitForElement(() => getByAltText(appointment, "Add"));

      // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      const day = getAllByTestId(container, "day").find((day) =>
        queryByText(day, "Monday")
      );

      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    }
  );

  // test #4
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {

    const { container } = render(<Application />);

    // Find an existing interview.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // With the existing interview, find the edit button.
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the name and save the interview.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Sylvia Palmer"));
    
    expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })
    
  // test #5
  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    // Find an existing interview
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // With the existing interview, find the Edit button
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the name and save the interview
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Error saving the interview")
    );

    expect(
      getByText(appointment, "Error saving the interview")
    ).toBeInTheDocument();
  })

  // test #6
  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    // Find an existing interview
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // With the existing interview, find the Delete button
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // Check that the element with the text "Deleting" is displayed
    // expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // Check that the confirmation message is shown
    expect(
      getByText(appointment, "Are you sure you want to delete this interview?")
    ).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation
    fireEvent.click(queryByText(appointment, "Confirm"));

    await waitForElement(() =>
      getByText(appointment, "Error deleting the interview")
    );

  });

});
