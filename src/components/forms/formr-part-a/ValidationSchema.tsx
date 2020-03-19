import moment from "moment";
import * as yup from "yup";

const phoneRegex = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/g;
const mobileRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;
const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;

export const ValidationSchema = yup.object({
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
    .string()
    .required("Your date of birth is required")
    .test(
      "dateOfBirth",
      "Your Date of birth must be more than 17 years ago.",
      value => moment().diff(moment(value), "years") >= 18
    ),
  gender: yup
    .string()
    .max(50)
    .required("Gender - one option is required"),
  immigrationStatus: yup
    .string()
    .max(50)
    .required("Immigration status is required."),
  qualification: yup
    .string()
    .max(100)
    .required("Qualification is required."),
  dateAttained: yup
    .string()
    .required("Date awarded (most recent qualification) is required.")
    .test(
      "dateAttained",
      "Date awarded (most recent qualification) - please choose a date from the past.",
      value => moment().diff(moment(value), "day") >= 1
    ),
  medicalSchool: yup
    .string()
    .max(50)
    .required("Medical school is required."),
  address1: yup
    .string()
    .max(50)
    .required("Address - house number/ name and road is required."),
  address2: yup
    .string()
    .max(50)
    .required("Address - district is required."),
  address3: yup
    .string()
    .max(50)
    .required("Address - town or city is required."),
  address4: yup
    .string()
    .max(50)
    .required("Address - country is required."),
  postCode: yup
    .string()
    .max(8)
    .required("Postcode is required")
    .matches(postcodeRegex, "Please enter a valid postcode"),
  telephoneNumber: yup
    .string()
    .required("Contact (landline telephone) is required.")
    .matches(
      phoneRegex,
      "Contact (landline) number - requires a valid number."
    ),
  mobileNumber: yup
    .string()
    .required("Contact (mobile) is required.")
    .matches(mobileRegex, "Contact (mobile) number - requires a valid number."),
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email is required"),
  declarationType: yup
    .string()
    .required("You need to choose one Declaration option")
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
    .string()
    .required("Anticipated completion date is required")
    .test(
      "completionDate",
      "Anticipated completion date - please choose a future date.",
      value => moment().diff(moment(value), "day") <= 1
    ),
  trainingGrade: yup
    .string()
    .max(50)
    .required("Programme training grade is required"),
  startDate: yup.string().required("Programme start date is required."),
  programmeMembershipType: yup
    .string()
    .max(50)
    .required("Programme training membership type is required"),
  wholeTimeEquivalent: yup
    .string()
    .max(50)
    .required("Programme Full Time or % of Full Time Training is required")
});
