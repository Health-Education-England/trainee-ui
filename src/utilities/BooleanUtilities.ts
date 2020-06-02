export class BooleanUtilities {
  public static ToYesNo(value: boolean | undefined): string {
    return value ? "Yes" : "No";
  }
}
