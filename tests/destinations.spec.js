import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  addDestination,
  vehicleSelected,
} from "../src/store/actions/destinations";
import configureStore from "../src/store/configureStore";

describe("Tests for Destinations", () => {
  let store;

  const createState = () => ({
    destinations: {},
  });

  const destinations = () => store.getState().destinations;

  beforeEach(() => {
    store = configureStore();
  });

  it("Should add destination to the store if planet is selected", async () => {
    const selectedObj = { destination: "destination1", value: "DonLon" };
    const expectedResult = {
      destination1: { selectedPlanet: "DonLon", showVehicle: true },
    };

    await store.dispatch(addDestination(selectedObj));

    expect(destinations()).toEqual(expectedResult);
  });

  it("Should add vehicle to the store if vehicle is selected", async () => {
    const selectedObj = {
      selectedVehicle: "Space rocket",
      destination: "destination1",
    };

    await store.dispatch(addDestination(selectedObj));
    await store.dispatch(vehicleSelected(selectedObj));

    expect(destinations()["destination1"].selectedVehicle).toEqual(
      selectedObj.selectedVehicle
    );
  });
});
