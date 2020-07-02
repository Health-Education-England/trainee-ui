import React from "react";
import { Button } from "nhsuk-react-components";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { FormsService } from "../../../services/FormsService";
import View from "./View";
import { FormRPartB } from "../../../models/FormRPartB";
import {
  moveToSection,
  saveForm,
  loadForm
} from "../../../redux/actions/formr-partb-actions";
import { Redirect } from "react-router-dom";
import { LifeCycleState } from "../../../models/LifeCycleState";

interface ConfirmProps {
  formData: FormRPartB | null;
  history: any;
  moveToSection: (section: number) => any;
  saveForm: (formsService: FormsService, formData: FormRPartB) => Promise<void>;
  loadForm: (formData: FormRPartB | null) => any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartB.formData
});

const mapDispatchToProps = {
  moveToSection,
  saveForm,
  loadForm
};

class Confirm extends React.PureComponent<ConfirmProps> {
  formsService: FormsService = new FormsService();

  handleSubmit = (formData: FormRPartB) => {
    formData.submissionDate = new Date();
    formData.lastModifiedDate = new Date();
    formData.lifecycleState = LifeCycleState.Submitted;

    this.props
      .saveForm(new FormsService(), formData)
      .then(_ => {
        // show success toast / popup
        this.props.history.push("/formr-b");
        this.props.loadForm(null);
      })
      .catch(_ => {
        // show failure toast / popup
      });
  };

  editSection = (section: number) => {
    this.props.moveToSection(section);
    this.props.history.push("/formr-b/create");
  };

  render() {
    const { formData } = this.props;
    if (!formData) {
      return <Redirect to="/formr-b/create" />;
    } else {
      return (
        <div>
          <View
            canEdit={true}
            history={this.props.history}
            editSection={this.editSection}
          ></View>

          <Button
            type="submit"
            onClick={() => this.handleSubmit(formData)}
            data-cy="BtnSubmitPartB"
          >
            Submit
          </Button>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
