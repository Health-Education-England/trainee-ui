import * as yup from "yup";
import { DateUtilities } from "../../../utilities/DateUtilities";

const phoneRegex = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/g;
const mobileRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;
const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;

const ValidationSchema = yup.object({
  forename: yup
    .string()
    .max(50)
    .required("Forename(s) is required"),
  surname: yup
    .string()
    .max(30)
    .required("Surname (GMC-Registered) is required"),
  gmcNumber: yup
    .string()
    .max(20)
    .required("GMC number is required"),
  localOfficeName: yup
    .string()
    .max(50)
    .required("Deanery / HEE Local Office is required"),
  dateOfBirth: yup
    .date()
    .required("Your date of birth is required")
    .test("dateOfBirth", "You must be 17 years or above", value =>
      DateUtilities.IsLegalAge(value)
    ),
  gender: yup
    .string()
    .max(50)
    .required("Select your Gender"),
  immigrationStatus: yup
    .string()
    .max(50)
    .required("Select an Immigration Status"),
  qualification: yup
    .string()
    .max(100)
    .required("Select a Qualification"),
  dateAttained: yup
    .date()
    .required("Date awarded (most recent qualification) is required")
    .test(
      "dateAttained",
      "Date awarded (most recent qualification) - please choose a date from the past",
      value => DateUtilities.IsPastDate(value)
    ),
  medicalSchool: yup
    .string()
    .max(50)
    .required("Medical school is required"),
  address1: yup
    .string()
    .max(50)
    .required("Address - house number/ name and road is required"),
  address2: yup
    .string()
    .max(50)
    .required("Address - district is required"),
  address3: yup
    .string()
    .max(50)
    .required("Address - town or city is required"),
  address4: yup
    .string()
    .max(50)
    .required("Address - country is required"),
  postCode: yup
    .string()
    .max(8)
    .required("Postcode is required")
    .matches(postcodeRegex, "Please enter a valid postcode"),
  telephoneNumber: yup
    .string()
    .required("Contact (landline telephone) is required")
    .matches(phoneRegex, "Contact (landline) number - requires a valid number"),
  mobileNumber: yup
    .string()
    .required("Contact (mobile) is required")
    .matches(mobileRegex, "Contact (mobile) number - requires a valid number"),
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email is required"),
  declarationType: yup
    .string()
    .required("You need to choose at least one Declaration")
    .nullable(),
  programmeSpecialty: yup
    .string()
    .max(50)
    .required("Programme specialty is required"),
  college: yup
    .string()
    .max(50)
    .required("Royal College / Faculty Assessing Training is required"),
  completionDate: yup
    .date()
    .required("Anticipated completion date is required")
    .test(
      "completionDate",
      "Anticipated completion date - please choose a future date",
      value => DateUtilities.IsFutureDate(value)
    ),
  trainingGrade: yup
    .string()
    .max(50)
    .required("Training Grade is required"),
  startDate: yup.date().required("Programme start date is required"),
  programmeMembershipType: yup
    .string()
    .max(50)
    .required("Post type / Appointment is required"),
  wholeTimeEquivalent: yup
    .number()
    .required("Programme Full Time or % of Full Time Training is required")
    .positive()
    .min(0, "Full Time Training value must be greater than or equal to 0")
    .max(100, "Full Time Training value must be less than or equal to 100")
});

export default ValidationSchema;
