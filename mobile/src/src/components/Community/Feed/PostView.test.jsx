import React from "react";
import { render } from "react-native-testing-library";
import PostView from "./PostView";
import { mockPost } from "../../../utils/mockData";

describe("<PostView />", () => {
  let screen = null;
  beforeEach(() => (screen = render(<PostView {...mockPost} />)));

  it("should contain a title", () => {
    expect(screen.getByText(mockPost.title));
  });
});
