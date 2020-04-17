import React from "react";
import View from "./View";
import { Button, WarningCallout } from "nhsuk-react-components";
import { FormRPartAService } from "../../../services/FormRPartAService";
import { GenericOwnProps, RootState } from "../../../redux/types";
import { DateUtilities } from "../../../utilities/DateUtilities";
import { ConnectedProps, connect } from "react-redux";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  formData: state.formRPartAView.formData,
  history: ownProps.history,
  location: ownProps.location
});

const connector = connect(mapStateToProps, {});

class Confirm extends React.PureComponent<ConnectedProps<typeof connector>> {
  formRPartAService: FormRPartAService = new FormRPartAService();

  handleEdit = () => {
    this.props.history.push({
      pathname: "/formr-a/create",
      history: this.props.history,
      formData: this.props.formData
    });
  };

  handleSubmit = () => {
    const { formData } = this.props;

    if (formData) {
      formData.submissionDate = DateUtilities.ToUTCDate(new Date());
      formData.lastModifiedDate = DateUtilities.ToUTCDate(new Date());

      this.formRPartAService
        .saveTraineeFormRPartA(formData)
        .then(() => this.props.history.push("/formr-a"));
    }
  };

  render() {
    const { formData } = this.props;
    if (!formData) {
      this.props.history.push("/formr-a");
      return null;
    }

    return (
      <div>
        <View
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
        <Button onClick={this.handleEdit} style={{ marginRight: 30 }}>
          Edit
        </Button>
        <Button type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default connector(Confirm);
