import { VALUE_NOT_GIVEN } from "./Constants";

export class StringUtilities {
  public static TrimZeros(str: string) {
    if (str) {
      if (Number(str).toString() !== "0") {
        return Number(str).toString();
      }
    }
    return VALUE_NOT_GIVEN;
  }
}
