import { CreateList } from "../CreateList";
import {
  loadFormRPartBList,
  loadForm
} from "../../../redux/actions/formr-partb-actions";

export default CreateList(loadFormRPartBList, loadForm, "formr-b");
