import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import { shallow } from 'enzyme';
import FeedContainer from './FeedContainer';
import { mockEvent, mockPost } from '../../../utils/mockData';

// Todo: We need to check that the FeedContainer renders the correct amount of PostView components onto the DOM,
// and we need to test that the state changes correctly when api calls to fetch more postings are made when scrolling to
// The bottom.
// We should also test the custom logic for getting the right posts from the api
describe('<FeedContainer />', () => {
  let wrapper = null;
  let feedContainer = null;
  beforeEach(() => {
    wrapper = shallow(<FeedContainer />);
    feedContainer = wrapper.instance();
    screen = render(<FeedContainer />);
  });

  it('Should get a list of posts', () => {
    expect(wrapper.state('posts')).toHaveLength(0);

    feedContainer.getPosts();

    waitFor(() => {
      expect(wrapper.state('posts')).toHaveLength(3);
    });
  });
});
