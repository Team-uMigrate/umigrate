import React from "react";
import "./MenuBarStyles.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MenuBarView = ({show, click}) => {
  return (
    <div>
      { show &&
        <div className="backdrop" onClick={click} />
      }
      <nav className={show ? "sidebar open" : "sidebar"}>
        <Nav.Item>
          <NavLink to="/community">Community</NavLink>
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
      </nav>
    </div>
  );
};

export default MenuBarView;
