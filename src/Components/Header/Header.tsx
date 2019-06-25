import React, { Component } from "react";
import "./Header.css";

interface IProps {
  darkMode: boolean;
}

const Header: React.FC<IProps> = props => {
  return (
    <div className={`header ${props.darkMode ? "headerDark" : "headerLight"}`}>
      <h1 className="headerText">How old?</h1>
    </div>
  );
};

export default Header;
