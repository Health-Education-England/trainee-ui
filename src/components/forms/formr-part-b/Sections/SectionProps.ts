import { FormRPartB } from "../../../../models/FormRPartB";

export interface SectionProps {
  formData: FormRPartB;
  previousSection: (formData: FormRPartB) => void;
  nextSection: (formData: FormRPartB) => void;
  history?: any;
}
