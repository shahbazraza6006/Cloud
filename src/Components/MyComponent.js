import React from "react";

const MyComponent = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <div>
      <p>API Base URL: {apiUrl}</p>
      <p>API Key: {apiKey}</p>
    </div>
  );
};

export default MyComponent;
