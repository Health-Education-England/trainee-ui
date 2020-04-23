import * as yup from "yup";
import { DateUtilities } from "../../../utilities/DateUtilities";

const phoneRegex = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/g;
const mobileRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;
const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;
const wholeTimeEquivalentRegex = /^((0\.[1-9]{1})?|(0\.([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1}))|1(\.0{1,2})?)$/;

const dateValidationSchema = (fieldName: string) =>
  yup.date().required(`${fieldName} is required`);

const stringValidationSchema = (fieldName: string, maxLength: number = 50) =>
  yup
    .string()
    .transform(value => (value as string).trim())
    .min(1)
    .max(maxLength, `${fieldName} must be shorter than ${maxLength} characters`)
    .required(`${fieldName} is required`);

const ValidationSchema = yup.object({
  forename: stringValidationSchema("Forename(s)"),
  surname: stringValidationSchema("Surname (GMC-Registered)", 30),
  gmcNumber: stringValidationSchema("GMC number", 20),
  localOfficeName: stringValidationSchema("Deanery / HEE Local Office"),
  dateOfBirth: dateValidationSchema("Your date of birth").test(
    "dateOfBirth",
    "You must be 17 years or above",
    value => DateUtilities.IsLegalAge(value)
  ),
  gender: stringValidationSchema("Gender"),
  immigrationStatus: stringValidationSchema("Immigration Status"),
  qualification: stringValidationSchema("Qualification"),
  dateAttained: dateValidationSchema(
    "Date awarded (most recent qualification)"
  ).test(
    "dateAttained",
    "Date awarded (most recent qualification) - please choose a date from the past",
    value => DateUtilities.IsPastDate(value)
  ),
  medicalSchool: stringValidationSchema("Medical school"),
  address1: stringValidationSchema("Address - house number/ name and road"),
  address2: stringValidationSchema("Address - district"),
  address3: stringValidationSchema("Address - town or city"),
  address4: stringValidationSchema("Address - country"),
  postCode: stringValidationSchema("Postcode", 8).matches(
    postcodeRegex,
    "Please enter a valid postcode"
  ),
  telephoneNumber: stringValidationSchema(
    "Contact (landline telephone)"
  ).matches(phoneRegex, "Contact (landline) number - requires a valid number"),
  mobileNumber: stringValidationSchema("Contact (mobile)").matches(
    mobileRegex,
    "Contact (mobile) number - requires a valid number"
  ),
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email"),
  declarationType: yup
    .string()
    .required("You need to choose at least one Declaration")
    .nullable(),
  programmeSpecialty: stringValidationSchema("Programme specialty"),
  college: stringValidationSchema("Royal College / Faculty Assessing Training"),
  completionDate: dateValidationSchema(
    "Anticipated completion date"
  ).test(
    "completionDate",
    "Anticipated completion date - please choose a future date",
    value => DateUtilities.IsFutureDate(value)
  ),
  trainingGrade: stringValidationSchema("Training Grade"),
  startDate: dateValidationSchema("Programme start date"),
  programmeMembershipType: stringValidationSchema("Post type / Appointment"),
  wholeTimeEquivalent: yup
    .string()
    .required("Programme Full Time Equivalent in Training is required")
    .test(
      "wholeTimeEquivalent",
      "Programme Full Time Equivalent in Training needs to be a number less than or equal to 1 and greater than zero (a maximum of 2 decimal places)",
      value => wholeTimeEquivalentRegex.test(value)
    )
    .nullable()
});

export default ValidationSchema;
