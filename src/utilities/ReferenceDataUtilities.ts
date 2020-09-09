import { KeyValue } from "../models/KeyValue";
export class ReferenceDataUtilities {
  private static getIdFromLabel(refData: KeyValue[], label: string) {
    const myObj: KeyValue | undefined = refData.find(
      (item: KeyValue) => item.label === label
    );

    if (typeof myObj !== "undefined") {
      return myObj.tisId;
    }
    return null;
  }

  public static isMatchInReferenceData(
    tisId: string | string[],
    label: string,
    refData: KeyValue[]
  ) {
    if (Array.isArray(tisId)) {
      return tisId.some(id => {
        return this.getIdFromLabel(refData, label) === id;
      });
    } else {
      if (this.getIdFromLabel(refData, label) === tisId) {
        return true;
      }
    }

    return false;
  }
}
