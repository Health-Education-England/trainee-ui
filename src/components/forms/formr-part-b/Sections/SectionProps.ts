import { FormRPartB } from "../../../../models/FormRPartB";

export interface SectionProps {
  formData: FormRPartB;
  previousSection: (formData: FormRPartB, section?: number) => void;
  nextSection: (formData: FormRPartB, section?: number) => void;
  saveDraft: (formData: FormRPartB) => void;
  history?: any;
  showCovidDeclaration?: boolean;
}
