import React, { Component } from "react";
import { ProfileEndpoint } from "../../../utils/endpoints";
import EditComponent from "./EditComponent";

class EditProfile extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
    this.getProfile();
  }

  getProfile = () => {
    ProfileEndpoint.get(
      (response) => {
        this.setState({ user: response.data });
      },
      (error) => {
        console.log(error);
        console.log(error.response);
      }
    );
  };

  render() {
    const navigation = this.props.navigation;
    const { user } = this.state;
    return <EditComponent user={user} navigation={navigation} />;
  }
}
export default ({ navigation }) => {
  // main issue is with initializing the useState
  return <EditProfile navigation={navigation} />;
};
