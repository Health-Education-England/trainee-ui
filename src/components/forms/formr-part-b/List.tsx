import { CreateList } from "../CreateList";
import {
  loadFormRPartBList,
  loadForm,
  initializeForm,
  loadSavedForm
} from "../../../redux/actions/formr-partb-actions";

export default CreateList(
  loadFormRPartBList,
  loadForm,
  loadSavedForm,
  initializeForm,
  "formr-b"
);
