import React from "react";
import { SummaryList, Fieldset } from "nhsuk-react-components";

class View extends React.Component<any> {
  render() {
    if (!this.props.location.state) {
      this.props.history.push("/formr-a");
      return null;
    }

    const formData = this.props.location.state.formData;
    return (
      formData && (
        <>
          <div className="nhsuk-back-link">
            <a className="nhsuk-back-link__link" href="/formr-a">
              <svg
                className="nhsuk-icon nhsuk-icon__chevron-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
              </svg>
              Go back
            </a>
          </div>
          <SummaryList>
            <Fieldset>
              <Fieldset.Legend isPageHeading>Form-R (Part A)</Fieldset.Legend>
            </Fieldset>
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
              <SummaryList.Value>{formData.dateOfBirth}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Gender</SummaryList.Key>
              <SummaryList.Value>{formData.gender}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Immigration Status</SummaryList.Key>
              <SummaryList.Value>
                {formData.immigrationStatus}, {formData.otherImmigrationStatus}
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
              <SummaryList.Value>{formData.dateAttained}</SummaryList.Value>
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
            <SummaryList.Row>
              <SummaryList.Key>CCT Speciality 1</SummaryList.Key>
              <SummaryList.Value>{formData.cctSpecialty1}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>CCT Speciality 2</SummaryList.Key>
              <SummaryList.Value>{formData.cctSpecialty2}</SummaryList.Value>
            </SummaryList.Row>
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
              <SummaryList.Value>{formData.completionDate}</SummaryList.Value>
            </SummaryList.Row>

            <h2>Programme</h2>
            <SummaryList.Row>
              <SummaryList.Key>Training Grade</SummaryList.Key>
              <SummaryList.Value>{formData.trainingGrade}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Start Date</SummaryList.Key>
              <SummaryList.Value>{formData.startDate}</SummaryList.Value>
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

export default View;
