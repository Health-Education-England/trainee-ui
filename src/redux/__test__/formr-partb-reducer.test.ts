import {
  ActionType,
  FormRPartBViewState,
  FormRPartBListState,
  NewFormRPartBState
} from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
  LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
  FORMR_PARTB_NEXT_SECTION,
  FORMR_PARTB_PREVIOUS_SECTION
} from "../action_types";
import {
  LoadFormRPartBReducer,
  LoadFormRPartBListReducer,
  LoadNewFormRPartBReducer
} from "../reducers/formr-partb-reducer";
import { FormRPartB } from "../../models/FormRPartB";

const formrPartB: FormRPartB = {
  traineeTisId: "123",
  forename: "Anthony Mara",
  surname: "Gilliam",
  gmcNumber: "11111111",
  localOfficeName: "Health Education England Thames Valley",
  email: "",
  programmeSpecialty: "ST6",
  prevRevalBody: "",
  currRevalDate: new Date("2021-12-31"),
  prevRevalDate: new Date("2021-12-31"),
  dualSpecialty: "",
  work: [
    {
      endDate: new Date("2020-12-31"),
      site: "Addenbrookes Hospital",
      siteLocation: undefined,
      startDate: new Date("2020-01-01"),
      trainingPost: "Yes",
      typeOfWork: "In Post ST1 Dermatology"
    }
  ],
  sicknessAbsence: 0,
  parentalLeave: 0,
  careerBreaks: 0,
  paidLeave: 0,
  unauthorisedLeave: 0,
  otherLeave: 0,
  totalLeave: 0,
  submissionDate: null,
  lastModifiedDate: null
};

describe("LoadFormRPartBReducer", () => {
  const initialState: FormRPartBViewState = {
    formData: null
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartBReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_SUCCESS action passed", () => {
    const state: FormRPartBViewState = {
      ...initialState,
      formData: null
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_SUCCESS,
      payload: null
    };

    expect(LoadFormRPartBReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORMR_PARTB_FAILURE action passed", () => {
    const state: FormRPartBViewState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_FAILURE,
      payload: null
    };

    expect(LoadFormRPartBReducer(initialState, failureAction)).toEqual(state);
  });
});

describe("LoadFormRPartBListReducer", () => {
  const initialState: FormRPartBListState = {
    submittedForms: []
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartBListReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_SUCCESS action passed", () => {
    const state: FormRPartBListState = {
      ...initialState,
      submittedForms: [formrPartB]
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_SUCCESS,
      payload: [formrPartB]
    };

    expect(LoadFormRPartBListReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_FAILURE action passed", () => {
    const state: FormRPartBListState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_FAILURE,
      payload: null
    };

    expect(LoadFormRPartBListReducer(initialState, failureAction)).toEqual(
      state
    );
  });
});

describe("LoadNewFormRPartBReducer", () => {
  let initialState: NewFormRPartBState = {
    formData: null,
    section: 1
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadNewFormRPartBReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS action passed", () => {
    const state: NewFormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 1
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
      payload: formrPartB
    };

    expect(LoadNewFormRPartBReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE action passed", () => {
    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
      payload: null
    };

    expect(LoadNewFormRPartBReducer(initialState, failureAction)).toEqual(
      initialState
    );
  });

  it("should add 1 to section when FORMR_PARTB_NEXT_SECTION action passed", () => {
    const state: NewFormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 2
    };

    const successAction: ActionType = {
      type: FORMR_PARTB_NEXT_SECTION,
      payload: formrPartB
    };

    expect(LoadNewFormRPartBReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should reduce section by 1 when FORMR_PARTB_PREVIOUS_SECTION action passed", () => {
    initialState = {
      formData: formrPartB,
      section: 3
    };

    const state: NewFormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 2
    };

    const successAction: ActionType = {
      type: FORMR_PARTB_PREVIOUS_SECTION,
      payload: formrPartB
    };

    expect(LoadNewFormRPartBReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should return section 1 when FORMR_PARTB_PREVIOUS_SECTION action passed", () => {
    initialState = {
      formData: formrPartB,
      section: 1
    };

    const state: NewFormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 1
    };

    const successAction: ActionType = {
      type: FORMR_PARTB_PREVIOUS_SECTION,
      payload: formrPartB
    };

    expect(LoadNewFormRPartBReducer(initialState, successAction)).toEqual(
      state
    );
  });
});
