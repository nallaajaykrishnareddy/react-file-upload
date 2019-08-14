import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
const FileUpload = () => {
  const [file, SetFile] = useState("");
  const [filename, SetFileName] = useState("Choose File");
  const [uploadedFile, SetUploadedFile] = useState({});
  const [message, SetMessage] = useState("");
  const handleChange = e => {
    SetFile(e.target.files[0]);
    SetFileName(e.target.files[0].name);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await axios.post("/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;
      SetUploadedFile({ fileName, filePath });
      SetMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        SetMessage("There was a problem with server");
        console.log("There was a problem with server");
      } else {
        SetMessage(err.response.data.msg);
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      {message ? <Message msg={message} /> : ""}
      <form onSubmit={handleSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleChange}
          />
          <label htmlFor="customFile" className="custom-file-label">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-4">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img src={uploadedFile.filePath} style={{ width: "100%" }} />
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default FileUpload;
