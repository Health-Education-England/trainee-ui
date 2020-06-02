import { BooleanUtilities } from "../BooleanUtilities";

describe("BooleanUtilities", () => {
  it("ToYesNo should return 'Yes' for true value", () => {
    expect(BooleanUtilities.ToYesNo(true)).toEqual("Yes");
  });

  it("ToYesNo should return 'No' for false value", () => {
    expect(BooleanUtilities.ToYesNo(false)).toEqual("No");
  });

  it("ToYesNo should return 'No' for undefined value", () => {
    expect(BooleanUtilities.ToYesNo(undefined)).toEqual("No");
  });
});
