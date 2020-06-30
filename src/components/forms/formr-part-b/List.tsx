import { CreateList } from "../CreateList";
import {
  loadFormRPartBList,
  loadForm,
  initializeForm
} from "../../../redux/actions/formr-partb-actions";
import { loadSavedForm } from "../../../redux/actions/formr-parta-actions";

export default CreateList(
  loadFormRPartBList,
  loadForm,
  loadSavedForm,
  initializeForm,
  "formr-b"
);
