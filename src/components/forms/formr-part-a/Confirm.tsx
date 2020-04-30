import React from "react";
import View from "./View";
import { Button, WarningCallout } from "nhsuk-react-components";
import { FormsService } from "../../../services/FormsService";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { FormRPartA } from "../../../models/FormRPartA";

interface ConfirmProps {
  formData: FormRPartA | null;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartAView.formData
});

class Confirm extends React.PureComponent<ConfirmProps> {
  formRPartAService: FormsService = new FormsService();

  handleEdit = (formData: FormRPartA) => {
    this.props.history.push({
      pathname: "/formr-a/create",
      formData: formData
    });
  };

  handleSubmit = (formData: FormRPartA) => {
    this.formRPartAService
      .saveTraineeFormRPartA(formData)
      .then(() => this.props.history.push("/formr-a"));
  };

  render() {
    const { formData } = this.props;
    if (!formData) {
      this.props.history.push("/formr-a/create");
      return null;
    }

    return (
      <div>
        <View history={this.props.history}></View>
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

export default connect(mapStateToProps)(Confirm);
