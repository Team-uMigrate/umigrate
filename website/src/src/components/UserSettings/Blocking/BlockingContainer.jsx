import React, { Component } from "react";
import styled from "styled-components";

class BlockingContainer extends Component {
  render() {
    return (
      <div>
        <Style>
          <Header>
            <h2>Blocked Users</h2>
          </Header>
          <p>This page will display blocked users.</p>
        </Style>
      </div>
    );
  }
}

export default BlockingContainer;

const Style = styled.div`
  grid-gap: 10px;
  margin-top: 2em;
  margin-left: 18em;
  margin-right: 3em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

const Header = styled.h2`
  margin-bottom: 1.3em;
  color: #7bc1b7;
`;
