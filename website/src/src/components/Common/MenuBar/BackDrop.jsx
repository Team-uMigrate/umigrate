import React from "react";
import styled from "styled-components";

const Backdrop = (props) =>
  <StyleBackdrop>
    <div className="backdrop" onClick = {props.click} />
  </StyleBackdrop>
;

export default Backdrop;

const StyleBackdrop = styled.div`
  .backdrop {
      position:fixed;
      width:100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.3);
      z-index:100;
  }
`;
