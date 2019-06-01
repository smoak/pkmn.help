import React from "react";
import { ShallowWrapper, shallow } from "enzyme";

import Footer from "./Footer";

describe("Footer", () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Footer />);
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
