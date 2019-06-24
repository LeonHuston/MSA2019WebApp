import React, { Component } from "react";
import Loader from "react-loader-spinner";

interface IProps {
  result: string;
  fileLength: any;
}

export default class Result extends Component<IProps, {}> {

    public render(){
        return (
            <div className="dank">
                {this.props.result === && this.props.fileLength > 0 ?
                <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /> :
                <p>{this.props.result}</p>}
            </div>
        )
    }
}
