import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchPlanets,
  getAvailablePlanets,
  getSelectedPlanets
} from "../src/store/actions/planets";
import configureStore from "../src/store/configureStore";

describe("Tests for Planets", () => {
  let fakeAxios;
  let store;

  const createState = () => ({
    planets: [
      { name: "Donlon", distance: 100 },
      { name: "Spain", distance: 1000 },
    ],
    destinations: {
      destination1: {
        selectedPlanet: "Donlon",
        showVehicle: true,
        selectedVehicle: "Space pod",
        timetaken: 50,
      },
    },
  });

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  it("Should add planets to the store if it is fetched from the server", async () => {
    const fakePlanet = [{ name: "Donlon", distance: 100 }];
    fakeAxios.onGet("/planets").reply(200, fakePlanet);

    await store.dispatch(fetchPlanets());

    expect(store.getState().planets).toEqual(fakePlanet);
  });

  it("Should not add planets to the store if it is not fetched from the server", async () => {
    fakeAxios.onGet("/planets").reply(500);

    await store.dispatch(fetchPlanets());

    expect(store.getState().planets).toHaveLength(0);
  });

  describe("Selectors", () => {
    it("getAvailablePlanets", () => {
      const state = createState();

      const result = getAvailablePlanets(state);

      expect(result).toHaveLength(1);
    });
  });

    it("getSelectedPlanets", ()=> {
        const state =  createState();
        const expectedResult = ['Donlon'];

        const result = getSelectedPlanets(state);

        expect(result).toEqual(expectedResult);
    })
});
