import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { shallow } from "enzyme";
import { mockComment } from "../../../utils/mockData";
import CommentView from "./CommentView";

describe("<CommentView />", () => {
  let wrapper = null;
  let commentView = null;
  beforeEach(() => {
    screen = render(<CommentView {...mockComment} />);
  });

  it("should contain the creator", () => {
    expect(screen.getByText(mockComment.creator.preferred_name));
  });

  it("should contain the datetime created", () => {
    expect(
      screen.getByText(
        mockComment.datetime_created.substring(0, "YYYY-MM-DD".length) +
          "\n" +
          mockComment.datetime_created.substring(
            "YYYY-MM-DD".length + 1,
            "YYYY-MM-DDTHH:MM".length
          )
      )
    );
  });

  it("should contain content", () => {
    expect(screen.getByText(mockComment.content));
  });
});
