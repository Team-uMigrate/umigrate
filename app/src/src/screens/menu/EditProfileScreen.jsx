import React, { Component } from 'react';
import EditView from '../../components/views/EditView';
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
    return <EditView user={user} navigation={navigation} />;
  }
}
export default EditProfileScreen;
