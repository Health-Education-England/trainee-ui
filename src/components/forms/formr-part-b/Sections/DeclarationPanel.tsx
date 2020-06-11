import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import { Button, Panel, CloseIcon } from "nhsuk-react-components";
import classes from "../FormRPartB.module.scss";
import SelectInputField from "../../SelectInputField";
import { DeclarationType } from "../../../../models/FormRPartB";

interface Props {
  index: number;
  removeDeclaration: any;
  section: number;
}

const DeclarationPanel: FunctionComponent<Props> = (props: Props) => {
  const { index, removeDeclaration: removePanel, section } = props;
  return (
    <Panel className={classes.placementPanel}>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-quarter">
          <h3>Declaration {index + 1}</h3>
        </div>
        <div className="nhsuk-grid-column-three-quarters">
          {index > 0 ? (
            <Button
              reverse
              type="button"
              data-jest="removePanel"
              data-cy={`closeIcon${index}`}
              onClick={() => removePanel(index)}
              className={classes.panelCloseButton}
              title="Delete"
            >
              <CloseIcon />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-third">
          <SelectInputField
            label="Declaration Type"
            name={
              section === 4
                ? `previousDeclarations[${index}].declarationType`
                : `currentDeclarations[${index}].declarationType`
            }
            options={[
              {
                label: "Significant event",
                value: DeclarationType.SignificantEvent
              },
              { label: "Complaint", value: DeclarationType.Complaint },
              {
                label: "Other investigation",
                value: DeclarationType.OtherInvestigation
              }
            ]}
          />
        </div>
        <div className="nhsuk-grid-column-one-third">
          <TextInputField
            label="Date of entry in portfolio"
            type="date"
            name={
              section === 4
                ? `previousDeclarations[${index}].dateOfEntry`
                : `currentDeclarations[${index}].dateOfEntry`
            }
            data-cy={`dateOfEntryInput${index}`}
          />
        </div>
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <TextInputField
            label="Title/ Topic of reflection/ event"
            name={`previousDeclarations[${index}].title`}
            data-cy={`titleInput${index}`}
          />
        </div>
        <div className="nhsuk-grid-column-one-half">
          <TextInputField
            label="Location of entry in portfolio"
            name={
              section === 4
                ? `previousDeclarations[${index}].locationOfEntry`
                : `currentDeclarations[${index}].locationOfEntry`
            }
            data-cy={`LocOfEntryInput${index}`}
          />
        </div>
      </div>
    </Panel>
  );
};

export default DeclarationPanel;
