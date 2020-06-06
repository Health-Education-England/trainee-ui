import React from "react";
import { Button, WarningCallout } from "nhsuk-react-components";
import { FormsService } from "../../services/FormsService";
import { RootState } from "../../redux/types";
import { connect, ConnectedComponent } from "react-redux";
import styles from "./FormR.module.scss";

export const CreateConfirm = (
  ViewComponent: ConnectedComponent<any, Pick<any, "history">>,
  rootPath: string
) => {
  interface ConfirmProps {
    formData: any | null;
    history: any;
  }

  const mapStateToProps = (state: RootState) => ({
    formData:
      rootPath === "formr-a"
        ? state.formRPartAView.formData
        : state.formRPartB.formData
  });

  class Confirm extends React.PureComponent<ConfirmProps> {
    formsService: FormsService = new FormsService();

    handleEdit = (formData: any) => {
      this.props.history.push({
        pathname: `/${rootPath}/create`,
        formData: formData
      });
    };

    handleSubmit = (formData: any) => {
      formData.submissionDate = new Date();
      formData.lastModifiedDate = new Date();

      if (rootPath === "formr-a") {
        this.formsService
          .saveTraineeFormRPartA(formData)
          .then(() => this.props.history.push(`/${rootPath}`));
      } else {
        this.formsService
          .saveTraineeFormRPartB(formData)
          .then(() => this.props.history.push(`/${rootPath}`));
      }
    };

    render() {
      const { formData } = this.props;
      if (!formData) {
        this.props.history.push(`/${rootPath}/create`);
        return null;
      }

      return (
        <div>
          <ViewComponent history={this.props.history}></ViewComponent>
          <WarningCallout label="Warning">
            <p>
              By submitting this form, I confirm that the information above is
              correct and I will keep my Designated Body, and the GMC, informed
              as soon as possible of any change to my contact details.
            </p>
          </WarningCallout>
          <Button
            className={styles.btnWarning}
            onClick={() => this.handleEdit(formData)}
          >
            Edit
          </Button>
          <Button
            type="submit"
            onClick={() => this.handleSubmit(formData)}
            data-cy="BtnSubmit"
          >
            Submit
          </Button>
        </div>
      );
    }
  }

  return connect(mapStateToProps)(Confirm);
};
