import moment from "moment";

export class DateUtilities {
  public static ToUTCDate(date: Date | string | null): string {
    let utcDate = "";

    if (date) {
      const momentDate = moment(date);
      utcDate = momentDate.isValid() ? moment(date).format("YYYY-MM-DD") : "";
    }

    return utcDate;
  }

  public static ToLocalDate(date: Date | string | null): string {
    let localDate = "";
    if (date) {
      const momentDate = moment(date);
      localDate = momentDate.isValid() ? momentDate.format("DD/MM/YYYY") : "";
    }

    return localDate;
  }

  public static IsLegalAge(value: Date | string): boolean {
    const momentDate = moment(value);
    return momentDate.isValid() && moment().diff(momentDate, "years") >= 18;
  }

  public static IsPastDate(value: Date | string): boolean {
    const momentDate = moment(value);
    return momentDate.isValid() && moment().diff(momentDate, "years") >= 1;
  }

  public static IsFutureDate(value: Date | string): boolean {
    const momentDate = moment(value);
    return momentDate.isValid() && moment().diff(momentDate, "years") <= 1;
  }
}
