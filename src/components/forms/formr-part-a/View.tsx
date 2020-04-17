import React from "react";
import { SummaryList, BackLink } from "nhsuk-react-components";
import { GenericOwnProps, RootState } from "../../../redux/types";
import { CCT_DECLARATION } from "./Constants";
import { DateUtilities } from "../../../utilities/DateUtilities";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  formData: state.formRPartAView.formData,
  history: ownProps.history,
  location: ownProps.location
});

const connector = connect(mapStateToProps, {});

class View extends React.PureComponent<ConnectedProps<typeof connector>> {
  render() {
    const { formData } = this.props;

    if (!formData) {
      this.props.history.push("/formr-a");
      return null;
    }

    return (
      formData && (
        <>
          <BackLink href="/formr-a">Go back to list</BackLink>

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
              <SummaryList.Key>Deanery / HEE Local Office</SummaryList.Key>
              <SummaryList.Value>{formData.localOfficeName}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Date of Birth</SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.dateOfBirth)}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Gender</SummaryList.Key>
              <SummaryList.Value>{formData.gender}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Immigration Status</SummaryList.Key>
              <SummaryList.Value>
                {formData.immigrationStatus}

                {formData.immigrationStatus === "Other" ? (
                  <span>, {formData.otherImmigrationStatus}</span>
                ) : null}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>
                Primary Qualification (most recent)
              </SummaryList.Key>
              <SummaryList.Value>{formData.qualification}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Date Awarded</SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.dateAttained)}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>
                Medical School Awarding Primary Qualification (name and country)
              </SummaryList.Key>
              <SummaryList.Value>{formData.medicalSchool}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Address</SummaryList.Key>
              <SummaryList.Value>
                <p>{formData.address1}</p>
                <p>{formData.address2}</p>
                <p>{formData.address3}</p>
                <p>
                  {formData.address4} - {formData.postCode}
                </p>
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Telephone</SummaryList.Key>
              <SummaryList.Value>{formData.telephoneNumber}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Mobile</SummaryList.Key>
              <SummaryList.Value>{formData.mobileNumber}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Email</SummaryList.Key>
              <SummaryList.Value>{formData.email}</SummaryList.Value>
            </SummaryList.Row>

            <h2>Declarations</h2>
            <SummaryList.Row>
              <SummaryList.Key>I confirm that</SummaryList.Key>
              <SummaryList.Value>{formData.declarationType}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Programme Specialty</SummaryList.Key>
              <SummaryList.Value>
                {formData.programmeSpecialty}
              </SummaryList.Value>
            </SummaryList.Row>
            {formData.declarationType === CCT_DECLARATION ? (
              <>
                <SummaryList.Row>
                  <SummaryList.Key>CCT Speciality 1</SummaryList.Key>
                  <SummaryList.Value>
                    {formData.cctSpecialty1}
                  </SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>CCT Speciality 2</SummaryList.Key>
                  <SummaryList.Value>
                    {formData.cctSpecialty2}
                  </SummaryList.Value>
                </SummaryList.Row>
              </>
            ) : null}
            <SummaryList.Row>
              <SummaryList.Key>
                Royal College / Faculty Assessing Training for the Award of CCT
              </SummaryList.Key>
              <SummaryList.Value>{formData.college}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>
                Anticipated Completion Date of Current Programme (if known
              </SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.completionDate)}
              </SummaryList.Value>
            </SummaryList.Row>

            <h2>Programme</h2>
            <SummaryList.Row>
              <SummaryList.Key>Training Grade</SummaryList.Key>
              <SummaryList.Value>{formData.trainingGrade}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Start Date</SummaryList.Key>
              <SummaryList.Value>
                {DateUtilities.ToLocalDate(formData.startDate)}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Post type / Appointment</SummaryList.Key>
              <SummaryList.Value>
                {formData.programmeMembershipType}
              </SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>
                Full Time or % of Full Time Training
              </SummaryList.Key>
              <SummaryList.Value>
                {formData.wholeTimeEquivalent}
              </SummaryList.Value>
            </SummaryList.Row>
          </SummaryList>
        </>
      )
    );
  }
}

export default connector(View);
