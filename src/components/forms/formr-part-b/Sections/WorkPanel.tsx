import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import { Button, Panel, CloseIcon } from "nhsuk-react-components";
import classes from "../FormRPartB.module.scss";

interface Props {
  index: number;
  removeWork: any;
}

const WorkPanel: FunctionComponent<Props> = (props: Props) => {
  const { index, removeWork: removePlacement } = props;
  return (
    <Panel className={classes.workPanel}>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-quarter">
          <h3>Type of work {index + 1}</h3>
        </div>
        <div className="nhsuk-grid-column-three-quarters">
          {index > 0 ? (
            <Button
              reverse
              type="button"
              onClick={() => removePlacement(index)}
              className={classes.panelCloseButton}
              title="Delete"
            >
              <CloseIcon />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <TextInputField
            label="Type of work"
            name={`work[${index}].placementType`}
            hint="e.g. name and grade of specialty rotation, OOP, maternity leave, etc."
          />
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <TextInputField
            label="Training Post"
            name={`work[${index}].trainingPost`}
          />
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <TextInputField
            label="Start Date"
            type="date"
            name={`work[${index}].startDate`}
          />
        </div>
        <div className="nhsuk-grid-column-one-half">
          <TextInputField
            label="End Date"
            type="date"
            name={`work[${index}].endDate`}
          />
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <TextInputField label="Site Name" name={`work[${index}].site`} />
        </div>
        <div className="nhsuk-grid-column-one-half">
          <TextInputField
            label="Site Location"
            name={`work[${index}].siteLocation`}
          />
        </div>
      </div>
    </Panel>
  );
};

export default WorkPanel;
