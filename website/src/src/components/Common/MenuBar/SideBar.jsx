import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SideBar = (props) => {
  let drawerClasses = ["sidebar"];
  if (props.show) {
    drawerClasses = ["sidebar open"];
  }
  return (
    <StyledSideBar>
      <nav className={drawerClasses}>
        <div className="sidebar__items">
          <Nav.Item>
            <NavLink to="/community">Community</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/settings/profile">Profile</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/housing">Housing</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/advertisements">Advertisements</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/messaging">Messaging</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/settings">Settings</NavLink>
          </Nav.Item>
        </div>
      </nav>
    </StyledSideBar>
  );
};

export default SideBar;

const StyledSideBar = styled.div`
  .sidebar{
      height:100%;
      background:  #323945;
      box-shadow:2px 0px 5px rgba(0,0,0,0.5);
      position:fixed;
      top:0;
      left:0;
      width: 70%;
      max-width: 300px;
      z-index:200;
      transform: translateX(-100%);
      transition: transform 0.3s ease-out;
  }

  .nav-item{
    padding: 12px;
    padding-left: 30px;
    font-size: 18px;
    border-bottom: solid 2px;
    &:hover{
      background-color: #31596d;
    }
  }
  
  .nav-item a{
    text-decoration:none
    font-size: ;
    color:white;
    &:hover{
      text-decoration:none;
    }
  }

  .sidebar.open{
    transform:translateX(0);
  }
 
  .dropdown{
      margin-left: 5px;
      color: black;
  }
`;
