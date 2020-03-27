import React from "react";
import { FormRPartAService } from "../../../services/FormRPartAService";
import { Button, Table, Fieldset, Label } from "nhsuk-react-components";
import { FormRPartA } from "../../../models/FormRPartA";

class List extends React.PureComponent<any, any> {
  formService: FormRPartAService = new FormRPartAService();

  constructor(props: any) {
    super(props);
    this.state = { submittedForms: null };
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
      pathname: "/formr-a-view",
      state: { formData: formData }
    });
  };

  handleNewFormClick = () => {
    this.props.history.push({
      pathname: "/formr-a-new",
      history: this.props.history
    });
  };

  render() {
    const { submittedForms } = this.state;
    console.log(submittedForms);
    return (
      <div>
        <Fieldset>
          <Fieldset.Legend isPageHeading>Form-R (Part A)</Fieldset.Legend>
        </Fieldset>
        <Button type="submit" onClick={this.handleNewFormClick}>
          Submit new form
        </Button>
        {submittedForms !== null ? (
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
                <Table.Row
                  key={formData.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleRowClick(formData)}
                >
                  <td>Form-R (Part A) on {formData.submissionDate}</td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Label>No forms submitted.</Label>
        )}
      </div>
    );
  }
}

export default List;
