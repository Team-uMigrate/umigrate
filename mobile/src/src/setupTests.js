import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { setupMockEndpoint } from './utils/mockEndpoints';

setupMockEndpoint();
configure({ adapter: new Adapter() });
