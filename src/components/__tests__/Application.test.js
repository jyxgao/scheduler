// we need React.createElement to render our component
import React from "react";
// import helper function(s) from react-testing library
import { render, cleanup } from "@testing-library/react";
// import component we're testing
import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
