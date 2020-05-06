import { CreateList } from "../CreateList";
import { loadFormRPartAList } from "../../../redux/actions/formr-parta-actions";
import { loadFormRPartA } from "../../../redux/actions/formr-parta-actions";

export default CreateList(loadFormRPartAList, loadFormRPartA, "formr-a");
