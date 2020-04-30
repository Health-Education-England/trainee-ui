import React from "react";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { FormRPartB } from "../../../models/FormRPartB";
import { RootState } from "../../../redux/types";
import { loadFormRPartB } from "../../../redux/actions/formr-partb-actions";
import { loadFormRPartBList } from "../../../redux/actions/formr-partb-actions";
import { connect } from "react-redux";
import { FormsService } from "../../../services/FormsService";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface ListProps {
  submittedForms: FormRPartB[];
  history: any;
  loadFormRPartBList: (service: FormsService) => Promise<void>;
  loadFormRPartB: (data: FormRPartB | null) => any;
}

const mapStateToProps = (state: RootState) => ({
  submittedForms: state.formRPartBList.submittedForms
});

const mapDispatchToProps = {
  loadFormRPartB,
  loadFormRPartBList
};

class List extends React.PureComponent<ListProps> {
  componentDidMount() {
    this.props.loadFormRPartBList(new FormsService());
  }

  handleRowClick = (formData: FormRPartB) => {
    const { loadFormRPartB, history } = this.props;

    loadFormRPartB(formData);
    history.push(`/formr-b/${formData.id}`);
  };

  handleNewFormClick = () => {
    const { history } = this.props;

    history.push({
      pathname: "/formr-b/create",
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
              {submittedForms.map((formData: FormRPartB) => (
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
