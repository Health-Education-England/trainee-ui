import { KeyValue } from "../../../models/KeyValue";
import { CCT_DECLARATION } from "./Constants";

export const Declarations = [
  CCT_DECLARATION,
  "I will be seeking specialist registration by application for a CESR",
  "I will be seeking specialist registration by application for a CESR CP",
  "I will be seeking specialist registration by application for a CEGPR",
  "I will be seeking specialist registration by application for a CEGPR CP",
  "I am a CORE trainee, not yet eligible for CCT"
].map<KeyValue>(d => {
  return {
    label: d,
    value: d
  };
});
