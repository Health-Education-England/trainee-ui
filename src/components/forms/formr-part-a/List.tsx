import { CreateList } from "../CreateList";
import {
  loadFormRPartAList,
  initializeForm,
  updateFormData,
  loadSavedForm
} from "../../../redux/actions/formr-parta-actions";

export default CreateList(
  loadFormRPartAList,
  updateFormData,
  loadSavedForm,
  initializeForm,
  "formr-a"
);
