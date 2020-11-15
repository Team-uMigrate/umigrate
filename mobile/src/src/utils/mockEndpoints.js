import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import {
  mockAd,
  mockComment,
  mockEvent,
  mockListing,
  mockPost,
  mockReply,
  mockUser,
} from './mockData';

function createMockResults(mockData, page) {
  let mockResults = [];
  for (let i = 0; i < 10; i++) {
    mockResults = mockResults.concat({ ...mockData, id: 110 - page * 10 - i });
  }
  return mockResults;
}

export function setupMockEndpoint() {
  const mockAxios = new MockAdapter(Axios);
  mockAxios.onGet(/^https:\/\/dev.umigrate.ca\/auth\/user\/$/).reply(200, {
    mockUser,
  });
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/posts\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: createMockResults(mockPost, 1),
      next: 'https://dev.umigrate.ca/api/posts/',
    });
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/events\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: createMockResults(mockEvent, 1),
      next: 'https://dev.umigrate.ca/api/events/',
    });
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/listings\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: createMockResults(mockListing, 1),
    });
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/ads\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: createMockResults(mockAd, 1),
    });
  mockAxios
    .onGet(/^https\/\/dev.umigrate.ca\/api\/comments\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: createMockResults(mockComment, 1),
    });
  mockAxios
    .onGet(
      /^https\/\/dev.umigrate.ca\/api\/comments\/replies\/\?page=[1-9]&comment=[1-9][0-9][0-9]*$/
    )
    .reply(200, {
      results: createMockResults(mockReply, 1),
    });
}
