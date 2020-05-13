import React from "react";
import styled from "styled-components";

const DrawerToggleButton = (props) =>
  <StyleButton>
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
    </button>
  </StyleButton>
;

export default DrawerToggleButton;

const StyleButton = styled.div`
  .toggle-button{
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      height:20px;
      width: 36px;
      background:transparent;
      border:none;
      cursor:pointer;
      padding: 0;
      box-sizing: border-box;
  }
      
  .toggle-button:focus{
      outline:none;
  }
  
  .toggle-button__line{
      width: 20px;
      height: 2px;
      background: white;
  }
`;
