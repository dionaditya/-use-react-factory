import * as React from 'react';
import { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

configure({adapter: new Adapter()});
const TestHook = ({ callback }: {callback: Function}) => {
  callback();
  return null;
};

export const testHook = (callback: Function) => {
  mount(<TestHook callback={callback} />);
};