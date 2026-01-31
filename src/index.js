import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// ... other imports

const root = ReactDOM.createRoot(document.getElementById("root"));

// CHANGE THIS:
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// TO THIS (Remove StrictMode tags):
root.render(<App />);
