import React, { Component } from "react";
import { ProfileEndpoint } from "../../../utils/endpoints";
import EditComponent from "./EditComponent";

class EditProfile extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const response = await ProfileEndpoint.get();
    this.setState({ user: response.data });
  };

  render() {
    const navigation = this.props.navigation;
    const { user } = this.state;
    return <EditComponent user={user} navigation={navigation} />;
  }
}
export default ({ navigation }) => {
  return <EditProfile navigation={navigation} />;
};
