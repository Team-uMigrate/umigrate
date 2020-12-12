import React, { Component } from 'react';
import { getUserData } from '../../../utils/endpoints';
import EditComponent from './EditComponent';

class EditProfile extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const userData = await getUserData();
    this.setState({ user: userData });
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
