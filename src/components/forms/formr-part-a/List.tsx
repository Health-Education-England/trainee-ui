import React from "react";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { FormRPartA } from "../../../models/FormRPartA";
import { GenericOwnProps, RootState } from "../../../redux/types";
import {
  loadFormRPartA,
  loadFormRPartAList
} from "../../../redux/actions/trainee-form-actions";
import { ConnectedProps, connect } from "react-redux";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  submittedForms: state.formRPartAList.submittedForms,
  history: ownProps.history
});

const mapDispatchToProps = {
  loadFormRPartA,
  loadFormRPartAList
};

const connector = connect(mapStateToProps, mapDispatchToProps);

class List extends React.PureComponent<ConnectedProps<typeof connector>> {
  componentDidMount() {
    this.props.loadFormRPartAList();
  }

  handleRowClick = (formData: FormRPartA) => {
    this.props.loadFormRPartA(formData);

    this.props.history.push(`/formr-a/${formData.id}`);
  };

  handleNewFormClick = () => {
    this.props.history.push({
      pathname: "/formr-a/create",
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
              {submittedForms.map((formData: FormRPartA) => (
                <Table.Row key={formData.id} style={{ cursor: "pointer" }}>
                  <td>
                    <ActionLink onClick={() => this.handleRowClick(formData)}>
                      form submitted on {formData.submissionDate}
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

export default connector(List);
