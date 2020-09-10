import React from "react";
import { render, cleanup, getByRole, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, waitForElementToBeRemoved, queryByText, getByDisplayValue } from "@testing-library/react";
import Application from "components/Application";
import axios from 'axios';

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  //async await version of above unit test
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //gets an array of DOM nodes:
    const appointments = getAllByTestId(container, "appointment");
    //access the first item in the array:
    const appointment = appointments[0];
    // start a book interview operation
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    });
    
  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    // // 3. Click the "Delete" button on the first appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    // // Check that confirmation message is shown
    expect(getByText(appointment, /are you sure you would like to delete?/i)).toBeInTheDocument()
    // // 4. Click "Confirm" button on that same appointment to delete.
    fireEvent.click(getByText(appointment, "Confirm"));
    // // 7. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 8. Wait until the element with the "Add" button is displayed
    
    await waitForElement(() => getByAltText(appointment, "Add"))
    // 9. Check that the DayListItem with the text "Monday" also has the text "2 spot remaining".
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
      expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Edit"));

    expect(getByDisplayValue(appointment, /archie cohen/i)).toBeInTheDocument();
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lisa Jones"}
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    expect(getByText(appointment, "Lisa Jones")).toBeInTheDocument();
    
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
});