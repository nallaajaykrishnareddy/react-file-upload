import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./components/FileUpload";
const App = () => {
  return (
    <div className="container">
      <h4 className="display-4 text-center mb-4">React File Upload</h4>
      <FileUpload />
    </div>
  );
};

export default App;
