import React from "react";
import { Navbar, Form, FormControl, Image} from "react-bootstrap";
import DrawerToggleButton from "../../../Common/MenuBar/DrawerTogglerButton";

import "../../../Common/MenuBar/TopBar.css";

const SettingsTopbar = (props) => (
      <Navbar>
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <Navbar.Brand href="/community" style ={{color:"white"}}>UMigrate</Navbar.Brand>
        <Form className="m-auto">
          <FormControl type="text" placeholder="Search" className="searchbar" />
        </Form>
        <Navbar.Brand href="/settings/profile" className="float-right my-auto">
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

  export default SettingsTopbar;