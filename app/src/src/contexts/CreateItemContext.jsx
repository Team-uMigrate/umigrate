import React, { Component, createContext } from 'react';

const CreateItemContext = createContext();

// A context provider that stores the modal visibility state
class CreateItemContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      setIsModalVisible: (isModalVisible) => {
        this.setState({ isModalVisible: isModalVisible });
      },
    };
  }

  render() {
    return (
      <CreateItemContext.Provider value={this.state}>
        {this.props.children}
      </CreateItemContext.Provider>
    );
  }
}

export { CreateItemContextProvider };
export default CreateItemContext;
