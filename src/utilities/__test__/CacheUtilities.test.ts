import { CacheUtilities } from "../CacheUtilities";

describe("DateUtilities", () => {
  it("semverGreaterThan should return true if latest version is greater than the current version ", () => {
    const latestV = "0.2.0";
    const currentV = "0.1.0";
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(true);
  });

  it("semverGreaterThan should return false if latest version is the same as the current version ", () => {
    const latestV = "0.1.0";
    const currentV = "0.1.0";
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });

  it("semverGreaterThan should return false if latest version is null", () => {
    const latestV = null;
    const currentV = "0.1.0";
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });

  it("semverGreaterThan should return false if latest version is undefined", () => {
    const latestV = undefined;
    const currentV = "0.1.0";
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });

  it("semverGreaterThan should return false if current version is null", () => {
    const latestV = "0.1.0";
    const currentV = null;

    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });

  it("semverGreaterThan should return false if current version is undefined", () => {
    const latestV = "0.1.0";
    const currentV = undefined;
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });

  it("semverGreaterThan should return false if latest version is incomplete", () => {
    const latestV = "0.1.";
    const currentV = "0.1.0";
    expect(CacheUtilities.SemverGreaterThan(latestV, currentV)).toEqual(false);
  });
});
