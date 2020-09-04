import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchVehicles,
  getAvailableVehicles,
  getSelectedVehicles,
} from "../src/store/actions/vehicles";
import configureStore from "../src/store/configureStore";

describe("Tests for Vehicles", () => {
  let fakeAxios;
  let store;

  const createState = () => ({
    vehicles: [
      { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
      { name: "Space rocket", total_no: 1, max_distance: 2000, speed: 3 },
    ],
    destinations: {
      destination1: {
        selectedPlanet: "Donlon",
        showVehicle: true,
        selectedVehicle: "Space rocket",
        timetaken: 50,
      },
    },
  });

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  it("Should add Vehicles to the store if it is fetched from the server", async () => {
    const fakeVehicle = [{ name: "rocket", maxdistance: 100 }];
    fakeAxios.onGet("/vehicles").reply(200, fakeVehicle);

    await store.dispatch(fetchVehicles());
    expect(store.getState().vehicles).toEqual(fakeVehicle);
  });

  it("Should not add Vehicles to the store if it is not fetched from the server", async () => {
    fakeAxios.onGet("/vehicles").reply(500);

    await store.dispatch(fetchVehicles());

    expect(store.getState().vehicles).toHaveLength(0);
  });

  describe("Selectors", () => {
    it("getAvailableVehicles", () => {
      const state = createState();
      const expectedResult = [
        { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
        { name: "Space rocket", total_no: 0, max_distance: 2000, speed: 3 },
      ];

      const result = getAvailableVehicles(state);

      expect(result).toEqual(expectedResult);
    });

    it("getSelectedVehicles", () => {
      const state = createState();
      const expectedResult = ["Space rocket"];

      const result = getSelectedVehicles(state);

      expect(result).toEqual(expectedResult);
    });
  });
});
