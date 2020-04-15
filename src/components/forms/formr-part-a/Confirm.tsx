import React from "react";
import View from "./View";
import { Button, WarningCallout } from "nhsuk-react-components";
import { FormRPartA } from "../../../models/FormRPartA";
import { FormRPartAService } from "../../../services/FormRPartAService";
import { GenericOwnProps } from "../../../redux/types";
import { DateUtilities } from "../../../utilities/DateUtilities";

class Confirm extends React.Component<GenericOwnProps> {
  formRPartAService: FormRPartAService = new FormRPartAService();

  handleEdit = (formData: FormRPartA) => {
    this.props.history.push({
      pathname: "/formr-a/create",
      history: this.props.history,
      formData: formData
    });
  };

  handleSubmit = (formData: FormRPartA) => {
    formData.submissionDate = DateUtilities.ToUTCDate(new Date());
    formData.lastModifiedDate = DateUtilities.ToUTCDate(new Date());

    formData.wholeTimeEquivalent = formData.wholeTimeEquivalent / 100;

    this.formRPartAService
      .saveTraineeFormRPartA(formData)
      .then(() => this.props.history.push("/formr-a"));
  };

  render() {
    if (this.props.location && !this.props.location.state) {
      this.props.history.push("/formr-a");
      return null;
    }
    const formData = this.props.location.state.formData;

    return (
      <div>
        <View
          formData={formData}
          showBackLink={false}
          location={this.props.location}
          history={this.props.history}
        ></View>
        <WarningCallout style={{ textAlign: "justify" }}>
          <h3 className="nhsuk-warning-callout__label">Warning</h3>
          <p>
            By submitting this form, I confirm that the information above is
            correct and I will keep my Designated Body, and the GMC, informed as
            soon as possible of any change to my contact details.
          </p>
        </WarningCallout>
        <Button
          onClick={() => this.handleEdit(formData)}
          style={{ marginRight: 30 }}
        >
          Edit
        </Button>
        <Button type="submit" onClick={() => this.handleSubmit(formData)}>
          Submit
        </Button>
      </div>
    );
  }
}

export default Confirm;
