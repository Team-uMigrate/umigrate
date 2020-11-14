import { setupMockEndpoint } from "./utils/mockEndpoints";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

setupMockEndpoint();
configure({ adapter: new Adapter() });
