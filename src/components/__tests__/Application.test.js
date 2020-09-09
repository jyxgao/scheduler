// we need React.createElement to render our component
import React from "react";
// import helper function(s) from react-testing library
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText } from "@testing-library/react";
// import component we're testing
import Application from "components/Application";


// afterEach(cleanup);
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

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
      //gets an array of DOM nodes:
      const appointments = getAllByTestId(container, "appointment")
      //access the first item in the array:
      const appointment = appointments[0];
      
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones"}
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      
      fireEvent.click(getByText(appointment, "Save"));
      debug()

    })
});
