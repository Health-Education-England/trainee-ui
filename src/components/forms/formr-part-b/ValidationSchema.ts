import * as yup from "yup";

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
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email is required"),
  localOfficeName: stringValidationSchema("Deanery / HEE Local Office"),
  previousRevalBody: yup.string(),
  programmeSpecialty: stringValidationSchema("Programme specialty"),
  dualSpecialty: yup.string()
});

export default ValidationSchema;
