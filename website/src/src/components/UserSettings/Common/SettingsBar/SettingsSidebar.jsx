import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

class SettingsSidebar extends Component {
  render() {
    return (
      <StyledSidebar>
        <nav className="sidebar">
          <div className="sidebar__items">
            <h5>General</h5>
            <ul>
              <li>
                <NavLink to="/settings/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/settings/account">Account</NavLink>
              </li>
              <li>
                <NavLink to="/settings/password">Password</NavLink>
              </li>
              <li>
                <NavLink to="/settings/notifications">Notifications</NavLink>
              </li>
              <li>
                <NavLink to="/settings/blocking">Blocking</NavLink>
              </li>
            </ul>
            <h5>Privacy</h5>
            <ul>
              <li>
                <NavLink to="/settings/location">Location</NavLink>
              </li>
              <li>
                <NavLink to="/settings/devices">Devices</NavLink>
              </li>
            </ul>
            <h5>Preferences</h5>
            <ul>
              <li>
                <NavLink to="/settings/language-and-region">
                  Language and Region
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings/display-and-theme">
                  Display and Theme
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </StyledSidebar>
    );
  }
}

export default SettingsSidebar;

const StyledSidebar = styled.div`
  .sidebar {
    height: 100%;
    background: white;
    width: 250px;
    border-right: solid;
    border-color: #acacac;
    position: fixed;
  }
  .sidebar h5 {
    padding: 0 1rem;
    padding-top: 20px;
    color: #31596d;
  }

  .sidebar__items ul {
    list-style: none;
    margin: 0;
    padding: 0 2rem;
    padding-top: 0px;
    padding-bottom: 20px;
    border-bottom: solid;
    border-width: 2.4px;
    border-color: #acacac;
  }

  .sidebar__items h5 {
    padding: 0 1rem;
    padding-top: 8px;
    color: #31596d;
  }

  .sidebar__items a {
    color: #737373;
    text-decoration: none;
    padding: 0;
  }

  .sidebar__items ul li link.active {
    background-color: black;
  }

  .sidebar__items a:hover {
    color: #31596d;
  }

  .sidebar__items a.active {
    color: #31596d;
    border-left: solid #31596d;
    font-size: 16px;
    padding-left: 8px;
  }
`;
