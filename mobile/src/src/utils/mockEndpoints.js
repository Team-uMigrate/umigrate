import MockAdapter from "axios-mock-adapter";
import Axios from "axios";
import { mockPost } from "./mockData";

export function setupMockEndpoint() {
  const mockAxios = new MockAdapter(Axios);
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/posts\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: [mockPost, { ...mockPost, id: 2 }, { ...mockPost, id: 3 }],
    });
  mockAxios
    .onGet(/^https:\/\/dev.umigrate.ca\/api\/events\/\?page=[1-9][0-9]*$/)
    .reply(200, {
      results: [],
    });
}
