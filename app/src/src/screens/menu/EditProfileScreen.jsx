import React, { Component } from 'react';
import EditProfileView from '../../components/views/EditProfileView';
import { getUserData } from '../../utils/storageAccess';

class EditProfileScreen extends Component {
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
    return <EditProfileView user={user} navigation={navigation} />;
  }
}
export default EditProfileScreen;
