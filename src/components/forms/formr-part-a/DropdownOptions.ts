import { KeyValue } from "../../../models/KeyValue";
import { CCT_DECLARATION } from "./Constants";

const Declarations = [
  CCT_DECLARATION,
  "I will be seeking specialist registration by application for a CESR",
  "I will be seeking specialist registration by application for a CESR CP",
  "I will be seeking specialist registration by application for a CEGPR",
  "I will be seeking specialist registration by application for a CEGPR CP",
  "I am a CORE trainee, not yet eligible for CCT"
];

const ImmigrationStatuses = [
  "EEA Resident",
  "Settled",
  "Ancestry Visa",
  "Dependant of HMSP",
  "Dependant of Work Permit",
  "Fresh Talent",
  "HSMP",
  "Indefinite Leave",
  "Limited LTR",
  "Permit Free",
  "Postgraduate Visa",
  "Refugee Doctor",
  "SEGS/IGS",
  "Spouse of EEA National",
  "Spouse of HMSP Holder",
  "Student Visa",
  "Tier 1",
  "Tier 2",
  "Tier 4",
  "TWES/MT1",
  "Work Permit",
  "Other"
];

export const ImmigrationStatusOptions = BuildKeyValues(ImmigrationStatuses);
export const DeclarationOptions = BuildKeyValues(Declarations);

function BuildKeyValues(options: string[]) {
  return options.map<KeyValue>(d => {
    return {
      label: d,
      value: d
    };
  });
}
