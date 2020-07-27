import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { FormRPartB } from "../../../../models/FormRPartB";
import Loading from "../../../common/Loading";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history: any[] = [];
const location: any[] = [];

const createStore = (form: FormRPartB | null, section: number = 1) =>
  mockStore({
    formRPartB: { formData: form, section: section },
    referenceData: {
      localOffices: [{ label: "localOffice", value: "localOffice" }],
      curricula: [{ label: "curriculum", value: "curriculum" }],
      isLoaded: true
    },
    formSwitches: {
      formSwitches: [
        {
          name: "COVID",
          enabled: false
        }
      ]
    }
  });

let store = createStore(submittedFormRPartBs[0]);

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );
  });

  [1, 2, 3, 4, 5, 6, 7].forEach(section => {
    it(`renders section ${section} when section value is ${section}`, () => {
      const store = createStore(submittedFormRPartBs[0], section);

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Create history={history} location={location} />
          </BrowserRouter>
        </Provider>
      );

      expect(wrapper.find("legend.nhsuk-fieldset__legend").text()).toContain(
        `Section ${section}`
      );
    });
  });

  it("should render Loading when section value is not valid", () => {
    const stores = createStore(submittedFormRPartBs[0], 0);

    const wrapper = mount(
      <Provider store={stores}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("should render Loading when reference data is not loaded", () => {
    store = mockStore({
      formRPartB: { formData: submittedFormRPartBs[0], section: 1 },
      referenceData: {
        localOffices: [],
        curricula: [],
        isLoaded: false
      },
      formSwitches: {
        formSwitches: [
          {
            name: "COVID",
            enabled: false
          }
        ]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find(Loading)).toHaveLength(1);
  });
});
