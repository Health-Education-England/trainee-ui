import React, { FormEvent } from "react";
import { Pagination, Button } from "nhsuk-react-components";
import { FormRPartB } from "../../../../models/FormRPartB";
import classes from "../FormRPartB.module.scss";

interface Props {
  nextSection?: number;
  prevSection: number;
  values: FormRPartB;
  previousSection: (v: FormRPartB, prevSection?: number) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  saveDraft: (v: FormRPartB) => void;
  prevSectionLabel?: string;
  nextSectionLabel?: string;
}

const FormRPartBPagination: React.FC<Props> = (props: Props) => {
  const {
    values,
    prevSection,
    nextSection,
    nextSectionLabel,
    prevSectionLabel
  } = props;

  return (
    <Pagination className={classes.heePagination}>
      <Pagination.Link
        previous
        onClick={() => props.previousSection(values, prevSection)}
        data-cy={`BacklinkToSection${prevSection}`}
      >
        {prevSectionLabel ? prevSectionLabel : `Section ${prevSection}`}
      </Pagination.Link>

      <Pagination.Link onClick={() => props.saveDraft(values)}>
        <Button type="button" data-cy="BtnSaveDraft">
          Save & Exit
        </Button>
      </Pagination.Link>

      <Pagination.Link
        next
        onClick={() => props.handleSubmit()}
        data-cy={`linkToSection${nextSection}`}
      >
        {nextSectionLabel ? nextSectionLabel : `Section ${nextSection}`}
      </Pagination.Link>
    </Pagination>
  );
};

export default FormRPartBPagination;
