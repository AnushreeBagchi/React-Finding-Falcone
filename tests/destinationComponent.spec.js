import { shallow, configure } from "enzyme";
import { Destinations } from "../src/components/Destinations";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const getState = () => ({
    destinations: {
      destination1: {selectedPlanet: "Donlon",selectedVehicle : "Space pod"},
    },
    planets: [{ distance: 100, name: "Donlon" }],
    vehicles: [{ max_distance: 200, name: "Space pod", speed: 2, total_no: 2 }]
  });

describe("Testing Destinations component renders correctly", () => {
  it("Test", () => {
    const dest = "destination1";

    const wrapper = shallow(
      <Destinations
        index={dest}
        planets={getState().planets}
        vehicles={getState().vehicles}
        state={getState()}
      />
    );
    
    expect(wrapper).toMatchSnapshot();
  });
});
