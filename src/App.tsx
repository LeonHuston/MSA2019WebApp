import React, { Component } from "react";
import DropArea from "./Components/DropArea/DropArea";
import Header from "./Components/Header/Header";
import Result from "./Components/Result/Result";

interface IState {
  result: string;
  fileLength: number;
  darkMode: boolean;
}

class App extends Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      result: "",
      fileLength: 0,
      darkMode: true
    };
  }

  public resultState = (resultSring: string, fileLen: any) => {
    this.setState({ result: resultSring, fileLength: fileLen });
  };

  public toggleTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };

  public render() {
    return (
      <div className={`App ${this.state.darkMode ? "dark" : "light"}`}>
        <Header darkMode={this.state.darkMode} />
        <button className="themeButton" onClick={this.toggleTheme}>
          Press this to toggle Dark Mode!!
        </button>
        <DropArea
          setResults={this.resultState}
          darkMode={this.state.darkMode}
        />
        <Result
          result={this.state.result}
          fileLength={this.state.fileLength}
          darkMode={this.state.darkMode}
        />
      </div>
    );
  }
}

export default App;
