import React from "react";
import { render } from "react-native-testing-library";
import ReplyView from "./ReplyView";
import { mockReply } from "../../../utils/mockData";

describe("<ReplyView />", () => {
  let screen = null;
  beforeEach(() => (screen = render(<ReplyView {...mockReply} />)));

  it("should contain the creator", () => {
    expect(screen.getByText(mockReply.creator.preferred_name));
  });

  it("should contain the datetime created", () => {
    expect(
      screen.getByText(
        mockReply.datetime_created.substring(0, "YYYY-MM-DD".length) +
          "\n" +
          mockReply.datetime_created.substring(
            "YYYY-MM-DD".length + 1,
            "YYYY-MM-DDTHH:MM".length
          )
      )
    );
  });

  it("should contain content", () => {
    expect(screen.getByText(mockReply.content));
  });
});
