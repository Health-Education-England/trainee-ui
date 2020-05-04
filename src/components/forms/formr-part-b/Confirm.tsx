import React from "react";
import View from "./View";
import { Button, WarningCallout } from "nhsuk-react-components";
import { FormsService } from "../../../services/FormsService";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { FormRPartB } from "../../../models/FormRPartB";

interface ConfirmProps {
  formData: FormRPartB | null;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartBView.formData
});

class Confirm extends React.PureComponent<ConfirmProps> {
  formsService: FormsService = new FormsService();

  handleEdit = (formData: FormRPartB) => {
    this.props.history.push({
      pathname: "/formr-b/create",
      formData: formData
    });
  };

  handleSubmit = (formData: FormRPartB) => {
    formData.submissionDate = new Date();
    formData.lastModifiedDate = new Date();

    this.formsService
      .saveTraineeFormRPartB(formData)
      .then(() => this.props.history.push("/formr-b"));
  };

  render() {
    const { formData } = this.props;
    if (!formData) {
      this.props.history.push("/formr-b/create");
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
