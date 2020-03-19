import { ProgrammeMembership } from "./ProgrammeMembership";
import { Placement } from "./Placement";
import { PersonalDetails } from "./PersonalDetails";

export interface TraineeProfile {
  personalDetails: PersonalDetails;
  programmeMemberships: ProgrammeMembership[];
  placements: Placement[];
}
