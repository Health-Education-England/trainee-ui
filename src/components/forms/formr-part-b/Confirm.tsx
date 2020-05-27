import React from "react";
import { Button } from "nhsuk-react-components";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { FormsService } from "../../../services/FormsService";
import View from "./View";

interface ConfirmProps {
  formData: any | null;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartBView.formData
});

class Confirm extends React.PureComponent<ConfirmProps> {
  formsService: FormsService = new FormsService();

  handleSubmit = (formData: any) => {
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
        <View canEdit={true} history={this.props.history}></View>

        <Button type="submit" onClick={() => this.handleSubmit(formData)}>
          Submit
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Confirm);
