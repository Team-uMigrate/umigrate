import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import { mockUser } from '../../utils/mockData';
import EditProfileView from '../../components/views/EditProfileView';
import { communities, programs, pronouns, terms } from '../../utils/choices';

describe('<EditProfileView /> UI Tests', () => {
  beforeEach(() => {
    screen = render(<EditProfileView user={mockUser} />);
  });

  it('should contain the preferred name as a text input', () => {
    expect(screen.getByDisplayValue(mockUser.preferred_name));
  });

  it('should contain the first name', () => {
    expect(screen.getByText(mockUser.first_name));
  });

  it('should contain the last name', () => {
    expect(screen.getByText(mockUser.last_name));
  });

  it('should contain the email', () => {
    expect(screen.getByText(mockUser.email));
  });

  it('should contain the phone number as a text input', () => {
    expect(screen.getByDisplayValue(mockUser.phone_number));
  });

  it('should contain the birthday', () => {
    expect(
      screen.getByText(mockUser.birthday.substring(0, 'YYYY-MM-DD'.length))
    );
  });

  it('should contain the pronoun', () => {
    expect(screen.getByText(pronouns[mockUser.pronouns]));
  });

  it('should contain the program', () => {
    expect(screen.getByText(programs[mockUser.enrolled_program]));
  });

  it('should contain the community', () => {
    expect(screen.getByText(communities[mockUser.community]));
  });

  it('should contain the current term', () => {
    expect(screen.getByText(terms[mockUser.current_term]));
  });
});
