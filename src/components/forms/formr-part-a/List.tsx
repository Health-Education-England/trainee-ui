import React from "react";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { FormRPartA } from "../../../models/FormRPartA";
import { RootState } from "../../../redux/types";
import { loadFormRPartA } from "../../../redux/actions/formr-parta-actions";
import { loadFormRPartAList } from "../../../redux/actions/formr-parta-actions";
import { connect } from "react-redux";
import { FormsService } from "../../../services/FormsService";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface ListProps {
  submittedForms: FormRPartA[];
  history: any;
  loadFormRPartAList: (service: FormsService) => Promise<void>;
  loadFormRPartA: (data: FormRPartA | null) => any;
}

const mapStateToProps = (state: RootState) => ({
  submittedForms: state.formRPartAList.submittedForms
});

const mapDispatchToProps = {
  loadFormRPartA,
  loadFormRPartAList
};

class List extends React.PureComponent<ListProps> {
  componentDidMount() {
    this.props.loadFormRPartAList(new FormsService());
  }

  handleRowClick = (formData: FormRPartA) => {
    const { loadFormRPartA, history } = this.props;

    loadFormRPartA(formData);
    history.push(`/formr-a/${formData.id}`);
  };

  handleNewFormClick = () => {
    const { history } = this.props;

    history.push({
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
