import React from "react";
import { Navbar, Image, NavDropdown } from "react-bootstrap";
import DrawerToggleButton from "../../Common/MenuBar/DrawerTogglerButton";

import "../../Common/MenuBar/TopBar.css";

const CommunityTopbar = (props) => (
      <Navbar>
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <Navbar.Brand style={{color: "white"}} href="/community">UMigrate</Navbar.Brand>
        <div className="m-auto">
          <NavDropdown title={"Community"} className="dropdown">
            <NavDropdown.Item href="/community">
              Olympus Community
            </NavDropdown.Item>
            <NavDropdown.Item href="/community">
              Toronto Community
            </NavDropdown.Item>
            <NavDropdown.Item href="/community">
              Waterloo Community
            </NavDropdown.Item>
          </NavDropdown>
          </div>
  
        <Navbar.Brand href="/settings/profile" className="float-right my-auto" >
          {props.displayName}
        </Navbar.Brand>
        <Image
          src={props.displayPhoto}
          roundedCircle
          className="float-right p-2 mb-20"
          style={{ width: "3em", height: "3em"}}
        />
      </Navbar>
  );

  export default CommunityTopbar;