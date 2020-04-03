import React from "react";
import { FormRPartAService } from "../../../services/FormRPartAService";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { FormRPartA } from "../../../models/FormRPartA";
import { GenericOwnProps } from "../../../redux/types";

interface ViewState {
  submittedForms: FormRPartA[];
}

class List extends React.PureComponent<GenericOwnProps, ViewState> {
  formService: FormRPartAService = new FormRPartAService();

  constructor(props: GenericOwnProps) {
    super(props);
    this.state = { submittedForms: [] };
  }

  componentDidMount() {
    this.formService.getTraineeFormRPartA().then(response => {
      if (response.data) {
        this.setState({ submittedForms: response.data });
      }
    });
  }

  handleRowClick = (formData: FormRPartA) => {
    this.props.history.push({
      pathname: `/formr-a/${formData.id}`,
      state: { formData: formData, showBackLink: true }
    });
  };

  handleNewFormClick = () => {
    this.props.history.push({
      pathname: "/formr-a/create",
      history: this.props.history,
      formData: undefined
    });
  };

  render() {
    const { submittedForms } = this.state;
    return (
      <div>
        <Button reverse type="submit" onClick={this.handleNewFormClick}>
          Submit new form
        </Button>
        {submittedForms.length > 0 ? (
          <>
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
          </>
        ) : (
          <LedeText>No forms found.</LedeText>
        )}
      </div>
    );
  }
}

export default List;
