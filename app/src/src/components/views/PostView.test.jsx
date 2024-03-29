import React from 'react';
import { render } from 'react-native-testing-library';
import PostView from './PostView';
import { mockPost } from '../../utils/mockData';
import { communities } from '../../utils/choices';

describe('<PostView />', () => {
  let screen = null;
  beforeEach(() => (screen = render(<PostView {...mockPost} />)));

  it('should contain the title', () => {
    expect(screen.getByText(mockPost.title));
  });

  it('should contain the creator', () => {
    expect(screen.getByText(mockPost.creator.preferred_name));
  });

  it('should contain the datetime created', () => {
    expect(
      screen.getByText(
        mockPost.datetime_created.substring(0, 'YYYY-MM-DD'.length)
      )
    );
  });

  it('should contain content', () => {
    expect(screen.getByText(mockPost.content));
  });

  it('should contain the community', () => {
    expect(screen.getByText(`Community: ${communities[mockPost.community]}`));
  });

  it('should contain the number of likes', () => {
    expect(screen.getByText(`Likes: ${mockPost.likes}`));
  });

  it('should contain the number of comments', () => {
    expect(screen.getByText(`Comments: ${mockPost.comments}`));
  });
});
