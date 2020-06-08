import React from "react";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { RootState, ActionType } from "../../redux/types";
import { connect } from "react-redux";
import { FormsService } from "../../services/FormsService";
import { DateUtilities } from "../../utilities/DateUtilities";
import styles from "./FormR.module.scss";

export const CreateList = (
  loadFormList: (
    formService: FormsService
  ) => (dispatch: (action: ActionType) => any) => Promise<void>,
  loadForm: (data: any | null) => any,
  rootPath: string
) => {
  interface ListProps {
    submittedForms: any[];
    history: any;
    loadFormList: (service: FormsService) => Promise<void>;
    loadForm: (data: any | null) => any;
  }

  const mapStateToProps = (state: RootState) => ({
    submittedForms:
      rootPath === "formr-a"
        ? state.formRPartAList.submittedForms
        : state.formRPartBList.submittedForms
  });

  const mapDispatchToProps = {
    loadForm,
    loadFormList
  };

  class List extends React.PureComponent<ListProps> {
    componentDidMount() {
      this.props.loadFormList(new FormsService());
    }

    handleRowClick = (formData: any) => {
      this.props.loadForm(formData);
      this.props.history.push(`/${rootPath}/${formData.id}`);
    };

    handleNewFormClick = () => {
      const { history } = this.props;

      history.push({
        pathname: `/${rootPath}/create`,
        history: this.props.history,
        formData: undefined
      });
    };

    render() {
      const { submittedForms } = this.props;
      return (
        <div>
          <Button reverse type="submit" onClick={this.handleNewFormClick}>
            Submit new form
          </Button>
          {submittedForms.length > 0 ? (
            <Table>
              <Table.Head>
                <Table.Row>
                  <td>
                    <b>Submitted forms</b>
                  </td>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {submittedForms.map((formData: any, index: number) => (
                  <Table.Row key={formData.id} className={styles.listTableRow}>
                    <td>
                      <ActionLink
                        onClick={() => this.handleRowClick(formData)}
                        data-cy={`submittedForm${index}`}
                      >
                        form submitted on{" "}
                        {DateUtilities.ToLocalDate(formData.submissionDate)}
                      </ActionLink>
                    </td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <LedeText>No forms found.</LedeText>
          )}
        </div>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(List);
};
