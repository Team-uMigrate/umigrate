import React from 'react';
import { Text } from 'react-native';
import { waitFor } from 'react-native-testing-library';
import { shallow } from 'enzyme';
import FeedContainer from './FeedContainer';
import { MockEndpoint1, MockEndpoint2 } from '../../utils/mockEndpoints';

const endpoints = [MockEndpoint1, MockEndpoint2];
const itemViews = [
  (item) => <Text>{item.id}</Text>,
  (item) => <Text>{item.id}</Text>,
];
const filtersList = [{}, {}];

const setup = (initialState) => {
  const feedContainerWrapper = shallow(
    <FeedContainer
      endpoints={endpoints}
      itemViews={itemViews}
      filtersList={filtersList}
      scrollRef={null}
    />,
    { disableLifecycleMethods: true }
  );
  feedContainerWrapper.setState(initialState);
  return feedContainerWrapper;
};

describe('<FeedContainer />', () => {
  let feedContainerWrapper = null;
  let feedContainer: FeedContainer = null;

  beforeEach(() => {
    feedContainerWrapper = setup({});
    feedContainer = feedContainerWrapper.instance();
  });

  it('should fetch items', async () => {
    await feedContainer.fetchItems();
    await waitFor(() => {
      expect(feedContainer.state.items).toHaveLength(9);
    });
  });
});
