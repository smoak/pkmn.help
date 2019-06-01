import React from "react";
import { ShallowWrapper, shallow } from "enzyme";

import Badge from "./Badge";
import { Type } from "../data";

describe("Badge", () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Badge pokemonType={Type.NORMAL} />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
