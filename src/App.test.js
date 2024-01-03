import React from "react";
import { render } from "@testing-library/react";
import MyComponent from "./Components/MyComponent";
import Home from './Pages/Home/Home';

require("dotenv").config();

describe("MyComponent", () => {
  test("renders API Base URL correctly", () => {

    const { getByText } = render(<MyComponent />);

 
    const apiUrl = process.env.REACT_APP_API_BASE_URL;


    const apiUrlElement = getByText(`API Base URL: ${apiUrl}`);
    expect(apiUrlElement).toBeInTheDocument();
  });

  

  test("renders API Key correctly", () => {
   
    
    const { getByText } = render(<MyComponent />);

   
    const apiKey = process.env.REACT_APP_API_KEY;

    const apiKeyElement = getByText(`API Key: ${apiKey}`);
    expect(apiKeyElement).toBeInTheDocument();
  });
});
