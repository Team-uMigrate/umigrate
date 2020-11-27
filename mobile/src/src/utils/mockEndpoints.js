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

function createMockResults(page, hour) {
  let mockResults = [];
  for (let i = 0; i < 5; i++) {
    mockResults = mockResults.concat({
      id: 10 - 5 * (page - 1) - i,
      datetime_created: new Date(2020, 0, 5 * page - i + 1, hour).toISOString(),
    });
  }
  return mockResults;
}

export function setupMockEndpoint() {
  const mockAxios = new MockAdapter(Axios);
  mockAxios.onGet(/^https:\/\/umigrate.ca\/api\/mock1\/\?page=1$/).reply(200, {
    results: createMockResults(1, 1),
    next: 'https://umigrate.ca/api/mock1/?page=2',
  });
  mockAxios.onGet(/^https:\/\/umigrate.ca\/api\/mock1\/\?page=2$/).reply(200, {
    results: createMockResults(2, 2),
    next: null,
  });
  mockAxios.onGet(/^https:\/\/umigrate.ca\/api\/mock2\/\?page=1$/).reply(200, {
    results: createMockResults(1, 2),
    next: 'https://umigrate.ca/api/mock2/?page=2',
  });
  mockAxios.onGet(/^https:\/\/umigrate.ca\/api\/mock2\/\?page=2$/).reply(200, {
    results: createMockResults(2, 1),
    next: null,
  });
}

export class MockEndpoint1 {
  static async list(page, filters = {}) {
    let queryString = '?page=' + page;
    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }
    return await Axios.get('https://umigrate.ca/api/mock1/' + queryString);
  }
}

export class MockEndpoint2 {
  static async list(page, filters = {}) {
    let queryString = '?page=' + page;
    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }
    return await Axios.get('https://umigrate.ca/api/mock2/' + queryString);
  }
}
