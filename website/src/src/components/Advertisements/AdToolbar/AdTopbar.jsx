import React from "react";
import { Navbar,Image} from "react-bootstrap";
import DrawerToggleButton from "../../Common/MenuBar/DrawerTogglerButton";

import "../../Common/MenuBar/TopBar.css";

const AdTopbar = (props) => (
      <Navbar>
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <Navbar.Brand style ={{color:"white"}} href="/community">UMigrate</Navbar.Brand>
        <h5 className="m-auto">Advertisement Hub</h5>
        <Navbar.Brand href="/settings/profile" className="float-right my-auto">
          {props.displayName}
        </Navbar.Brand>
        <div classname = "userPhoto">
        <Image
          src={props.displayPhoto}
          roundedCircle
          className="float-right p-2 mb-20"
          style={{ width: "3em", height: "3em"}}
        />
        </div>
      </Navbar>
  );

  export default AdTopbar;

