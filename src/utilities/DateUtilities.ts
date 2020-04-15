import moment from "moment";

export class DateUtilities {
  public static ToUTCDate(date: Date | string) {
    return moment(date).format("YYYY-MM-DD");
  }

  public static ToLocalDate(date: Date | string) {
    return moment(date).format("DD/MM/YYYY");
  }

  public static IsLegalAge(value: any) {
    return moment().diff(moment(value), "years") >= 18;
  }

  public static IsPastDate(value: any) {
    return moment().diff(moment(value), "day") >= 1;
  }

  public static IsFutureDate(value: any) {
    return moment().diff(moment(value), "day") <= 1;
  }
}
