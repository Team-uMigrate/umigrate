import React from "react";
import {Navbar, Image, NavDropdown, Form, FormControl} from "react-bootstrap";
import "./NavigationBarStyles.css"
import { Menu, Search, Notifications, AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import {USER_DATA} from "../../../constants/misc/localStorageKeys";

const NavigationBarView = ({title, drawerClickHandler}) => {
  const userData = JSON.parse(localStorage.getItem(USER_DATA));

  return (
    <Navbar className="bg-white">
      <IconButton className="mx-2" onClick={drawerClickHandler} >
        <Menu />
      </IconButton>
      <Search className="mx-2" />
      <Form inline>
        <FormControl type="text" placeholder="Search" />
      </Form>
      {
        title === "Community" ?
          <NavDropdown className="mx-auto" id="nav-dropdown" title={title}>
            <NavDropdown.Item href="/community">Africa</NavDropdown.Item>
            <NavDropdown.Item href="/community">Asia</NavDropdown.Item>
            <NavDropdown.Item href="/community">Europe</NavDropdown.Item>
            <NavDropdown.Item href="/community">North America</NavDropdown.Item>
            <NavDropdown.Item href="/community">South America</NavDropdown.Item>
          </NavDropdown>
          :
          <Navbar.Brand className="mx-auto">{title}</Navbar.Brand>
      }
      <Notifications className="mx-2" />
      <Navbar.Brand className="mx-2" >{userData.preferred_name}</Navbar.Brand>
      {userData.photo === null ?
        <AccountCircle className="mx-2" />
        :
        <Navbar.Brand className="mx-2" href="settings">
          <Image
            className="d-inline-block align-top"
            src={userData.photo}
            roundedCircle
            width="40px"
            height="40px"
          />
        </Navbar.Brand>
      }
    </Navbar>
  );
};

export default NavigationBarView;
