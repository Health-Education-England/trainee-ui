import React, { FormEvent } from "react";
import { Pagination, Button } from "nhsuk-react-components";
import { FormRPartB } from "../../../../models/FormRPartB";
import classes from "../FormRPartB.module.scss";

interface Props {
  section: number;
  values: FormRPartB;
  previousSection: (v: FormRPartB) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  saveDraft: (v: FormRPartB) => void;
}

const FormRPartBPagination: React.FC<Props> = (props: Props) => {
  const { values, section } = props;
  return (
    <Pagination className={classes.heePagination}>
      <Pagination.Link
        previous
        onClick={() => props.previousSection(values)}
        data-cy={`BacklinkToSection${section - 1}`}
      >
        Section {section - 1}
      </Pagination.Link>

      <Pagination.Link onClick={() => props.saveDraft(values)}>
        <Button type="button" data-cy="BtnSaveDraft">
          Save & Exit
        </Button>
      </Pagination.Link>

      <Pagination.Link
        next
        onClick={() => props.handleSubmit()}
        data-cy={`linkToSection${section + 1}`}
      >
        Section {section + 1}
      </Pagination.Link>
    </Pagination>
  );
};

export default FormRPartBPagination;
