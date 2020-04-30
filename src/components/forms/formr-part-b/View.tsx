import React from "react";
import { SummaryList, BackLink } from "nhsuk-react-components";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { FormRPartB } from "../../../models/FormRPartB";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface ViewProps {
  formData: FormRPartB | null;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartBView.formData
});

class View extends React.PureComponent<ViewProps> {
  render() {
    const { formData, history } = this.props;

    if (!formData) {
      history.push("/formr-a");
      return null;
    }

    return (
      formData && (
        <>
          <BackLink href="/formr-b">Go back to list</BackLink>

          <SummaryList>
            <h2>Personal Details</h2>
            <SummaryList.Row>
              <SummaryList.Key>Forname</SummaryList.Key>
              <SummaryList.Value>{formData.forename}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Surname (GMC-Registered)</SummaryList.Key>
              <SummaryList.Value>{formData.surname}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>GMC Number</SummaryList.Key>
              <SummaryList.Value>{formData.gmcNumber}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Email</SummaryList.Key>
              <SummaryList.Value>{formData.email}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Deanery / HEE Local Office</SummaryList.Key>
              <SummaryList.Value>{formData.localOfficeName}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>
                Previous Designated Revalidation Body
              </SummaryList.Key>
              <SummaryList.Value>{formData.prevRevalBody}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Current Revalidation Date</SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.currRevalDate || null)}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Previous Revalidation Date</SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.prevRevalDate || null)}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Programme Specialty</SummaryList.Key>
              <SummaryList.Value>
                {formData.programmeSpecialty}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Dual Specialty</SummaryList.Key>
              <SummaryList.Value>{formData.dualSpecialty}</SummaryList.Value>
            </SummaryList.Row>
          </SummaryList>
        </>
      )
    );
  }
}

export default connect(mapStateToProps)(View);
