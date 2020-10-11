import React from "react";
import { render, waitFor } from "react-native-testing-library";
import FeedContainer from "./FeedContainer";
import { setupMockEndpoint } from "../../../utils/mockEndpoints";
import { mockPost } from "../../../utils/mockData";

describe("<FeedContainer />", () => {
  let screen = null;
  beforeEach(() => {
    setupMockEndpoint();
    screen = render(<FeedContainer />);
  });

  it("should contain 3 items", async () => {
    await waitFor(() =>
      expect(
        screen.queryAllByText(mockPost.creator.preferred_name).length
      ).toBe(3)
    );
  });
});
