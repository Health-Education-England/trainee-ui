import * as yup from "yup";
import { DateUtilities } from "../../../utilities/DateUtilities";

const phoneRegex = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/g;
const mobileRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;
const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;
const wholeTimeEquivalentRegex = /^\d(\.\d{0,2})?$/;

const dateSchema = (fieldName: string) =>
  yup.date().required(`${fieldName} is required`);

const stringSchema = (fieldName: string, maxLength: number = 50) =>
  yup
    .string()
    .transform(value => (value as string).trim())
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(maxLength, `${fieldName} must be shorter than ${maxLength} characters`)
    .required(`${fieldName} is required`);

const ValidationSchema = yup.object({
  forename: stringSchema("Forename(s)"),
  surname: stringSchema("Surname (GMC-Registered)", 30),
  gmcNumber: stringSchema("GMC number", 20),
  localOfficeName: stringSchema("Deanery / HEE Local Office"),
  dateOfBirth: dateSchema("Your date of birth").test(
    "dateOfBirth",
    "You must be 17 years or above",
    value => DateUtilities.IsLegalAge(value)
  ),
  gender: stringSchema("Gender"),
  immigrationStatus: stringSchema("Immigration Status"),
  qualification: stringSchema("Qualification"),
  dateAttained: dateSchema(
    "Date awarded (most recent qualification)"
  ).test(
    "dateAttained",
    "Date awarded (most recent qualification) - please choose a date from the past",
    value => DateUtilities.IsPastDate(value)
  ),
  medicalSchool: stringSchema("Medical school", 100),
  address1: stringSchema("Address - house number/ name and road"),
  address2: stringSchema("Address - district"),
  address3: stringSchema("Address - town or city"),
  address4: stringSchema("Address - country"),
  postCode: stringSchema("Postcode", 8).matches(
    postcodeRegex,
    "Please enter a valid postcode"
  ),
  telephoneNumber: stringSchema("Contact (landline telephone)").matches(
    phoneRegex,
    "Contact (landline) number - requires a valid number"
  ),
  mobileNumber: stringSchema("Contact (mobile)").matches(
    mobileRegex,
    "Contact (mobile) number - requires a valid number"
  ),
  email: stringSchema("Email").email("Email is invalid"),
  declarationType: yup
    .string()
    .required("You need to choose at least one Declaration")
    .nullable(),
  programmeSpecialty: stringSchema("Programme specialty"),
  college: stringSchema("Royal College / Faculty Assessing Training"),
  completionDate: dateSchema(
    "Anticipated completion date"
  ).test(
    "completionDate",
    "Anticipated completion date - please choose a future date",
    value => DateUtilities.IsFutureDate(value)
  ),
  trainingGrade: stringSchema("Training Grade"),
  startDate: dateSchema("Programme start date"),
  programmeMembershipType: stringSchema("Post type / Appointment"),
  wholeTimeEquivalent: yup
    .number()
    .nullable()
    .required("Programme Full Time or % of Full Time Training")
    .min(0, "Full Time Training value must be greater than or equal to 0")
    .max(1, "Full Time Training value must be less than or equal to 1")
    .test("wholeTimeEquivalent", "Only two decimal places allowed", value =>
      wholeTimeEquivalentRegex.test(value)
    )
});

export default ValidationSchema;
