import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import { waitFor } from 'react-native-testing-library';
import { shallow } from 'enzyme';
import CreateCommunityItems from './CreateCommunityItems';

describe('<CreateCommunityItems />', () => {
  let screen = null;
  beforeEach(() => (screen = render(shallow(<CreateCommunityItems />))));

  it('should contain post, poll, and event options', () => {
    expect(screen.getByText('Post'));
    expect(screen.getByText('Poll'));
    expect(screen.getByText('Event'));
  });
});
