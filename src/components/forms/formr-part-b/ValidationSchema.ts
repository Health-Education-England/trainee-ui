import * as yup from "yup";
import { StringValidationSchema } from "../StringValidationSchema";

const leaveValidation = (fieldName: string) =>
  yup
    .number()
    .typeError(`${fieldName} must be a positive number  or zero`)
    .min(0, `${fieldName} must be a positive number or zero`)
    .max(999, `${fieldName} must not be more than 999`)
    .required(`${fieldName} is required`);

export const Section1ValidationSchema = yup.object({
  forename: StringValidationSchema("Forename(s)"),
  surname: StringValidationSchema("Surname (GMC-Registered)", 30),
  gmcNumber: StringValidationSchema("GMC number", 20),
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email is required"),
  localOfficeName: StringValidationSchema("Deanery / HEE Local Office"),
  prevRevalBody: yup.string(),
  programmeSpecialty: StringValidationSchema("Programme / Training Specialty"),
  dualSpecialty: yup.string()
});

export const Section2ValidationSchema = yup.object({
  work: yup
    .array(
      yup.object({
        typeOfWork: StringValidationSchema("Type of work"),
        trainingPost: StringValidationSchema("Training Post"),
        site: StringValidationSchema("Site Name"),
        siteLocation: StringValidationSchema("Site Location"),
        startDate: yup.date().required("Start date is required"),
        endDate: yup
          .date()
          .required("End date is required")
          .min(yup.ref("startDate"), "End date must be later than Start date")
      })
    )
    .min(1, "Atleast one type of work should be added")
    .max(30, "Maximum number of placements allowed are restricted to 30"),
  sicknessAbsence: leaveValidation("Short and Long-term sickness absence"),
  parentalLeave: leaveValidation(
    "Parental leave (incl Maternity / Paternity leave)"
  ),
  careerBreaks: leaveValidation(
    "Career breaks within a Programme (OOPC) and non-training placements for experience (OOPE)"
  ),
  paidLeave: leaveValidation(
    "Paid / unpaid leave (e.g. compassionate, jury service)"
  ),
  unauthorisedLeave: leaveValidation(
    "Unpaid/unauthorised leave including industrial action"
  ),
  otherLeave: leaveValidation("Other"),
  totalLeave: leaveValidation("Total")
});
