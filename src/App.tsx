import React, { Component } from "react";
import DropArea from "./Components/DropArea/DropArea";
import Header from "./Components/Header/Header";
import Result from "./Components/Result/Result";

interface IState {
  result: string;
  fileLength: number;
}

class App extends Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      result: "",
      fileLength: 0
    };
  }

  public resultState = (resultSring: string, fileLen: any) => {
    this.setState({ result: resultSring, fileLength: fileLen });
  };

  public render() {
    return (
      <div>
        <Header />
        <DropArea setResults={this.resultState} />
        <Result result={this.state.result} fileLength={this.state.fileLength} />
      </div>
    );
  }
}

export default App;
