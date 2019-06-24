import React, { Component } from "react";
import "./DropArea.css";
import ReactDropzone from "react-dropzone";
import { any } from "prop-types";
import { relative } from "path";

interface IState {
  imagesFiles: any[];
  dropzone: any;
}

interface IProps {
  setResults: any;
}

export default class DropArea extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      imagesFiles: [],
      dropzone: this.onDrop.bind(this)
    };
  }

  public onDrop(files: any) {
    this.setState({ imagesFiles: files });
    this.props.setResults("", this.state.imagesFiles.length);
    const file = files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const binaryString = (event.target as FileReader).result;
      if (typeof binaryString === "string") {
        this.upload(btoa(binaryString));
      }
    };
    try {
      reader.readAsBinaryString(file);
    } catch (error) {
      this.props.setResults(
        "Sorry we had trouble loading that file please use a downloaded image file",
        0
      );
    }
  }

  public upload(base64String: String) {
    const base64 = require("base64-js");
    const byteArray = base64.toByteArray(base64String);
    fetch("https://whatsmyage.azurewebsites.net/image", {
      body: byteArray,
      headers: {
        ContentType: "application/octet-stream"
      },
      method: "POST"
    }).then((response: any) => {
      if (!response.ok) {
        this.props.setResults(
          "Sorry there was an error",
          this.state.imagesFiles.length
        );
      } else {
        response.json().then((json: any[]) => {
          if (json.length < 1) {
            this.props.setResults(
              "Sorry no face detected",
              this.state.imagesFiles.length
            );
          } else {
            this.props.setResults(
              `Age is ${json[0].faceAttributes.age}`,
              this.state.imagesFiles.length
            );
          }
        });
      }
    });
  }
  public render() {
    return (
      <div className="cont">
        <div className="centreText">
          <div className="dropZone">
            <ReactDropzone
              accept="image/*"
              onDrop={this.state.dropzone}
              style={{ position: "relative" }}
            >
              <div className="dropZoneText">
                {this.state.imagesFiles.length > 0 ? (
                  <div>
                    {this.state.imagesFiles.map(file => (
                      <img
                        className="image1"
                        key={file.name}
                        src={file.preview}
                      />
                    ))}
                  </div>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </div>
            </ReactDropzone>
          </div>
        </div>
      </div>
    );
  }
}
