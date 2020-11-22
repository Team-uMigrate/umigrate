import React from 'react';
import { Text } from 'react-native';
import { waitFor } from 'react-native-testing-library';
import { shallow } from 'enzyme';
import FeedContainer from './FeedContainer';
import { MockEndpoint1, MockEndpoint2 } from '../../utils/mockEndpoints';

describe('<FeedContainer />', () => {
  let shallowFeedContainer = null;
  let feedContainer: FeedContainer = null;
  const endpoints = [MockEndpoint1, MockEndpoint2];
  const itemViews = [
    (item) => <Text>{item.id}</Text>,
    (item) => <Text>{item.id}</Text>,
  ];

  beforeEach(() => {
    shallowFeedContainer = shallow(
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[{}, {}]}
        scrollRef={null}
      />,
      { disableLifecycleMethods: true }
    );
    feedContainer = shallowFeedContainer.instance();
  });

  it('Should fetch items', async () => {
    await feedContainer.fetchItems();
    await waitFor(() => {
      expect(feedContainer.state.items).toHaveLength(9);
    });
  });
});
