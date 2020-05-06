import { CreateList } from "../CreateList";
import { loadFormRPartBList } from "../../../redux/actions/formr-partb-actions";
import { loadFormRPartB } from "../../../redux/actions/formr-partb-actions";

export default CreateList(loadFormRPartBList, loadFormRPartB, "formr-b");
