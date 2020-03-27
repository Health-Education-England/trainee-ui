import { Formik, Form } from "formik";
import React from "react";
import {
  Label,
  Fieldset,
  Radios,
  Button,
  ErrorSummary
} from "nhsuk-react-components";
import { KeyValue } from "../../../models/KeyValue";
import fetchTraineeFormRPartAInitialValues from "../../../redux/actions/traineeFormActions";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { SelectInputField } from "./SelectInputField";
import { TextInputField } from "./TextInputField";
import { WarningMessage } from "./WarningMessage";
import { ValidationSchema } from "./ValidationSchema";
import { TraineeReferenceService } from "../../../services/TraineeReferenceService";
import { FormRPartAService } from "../../../services/FormRPartAService";
import { AxiosResponse } from "axios";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: RootState, ownProps: any) => ({
  initialFormValues: state.formRPartA.intialFormValues,
  history: ownProps.history,
  isLoaded: state.formRPartA.isLoaded,
  error: state.formRPartA.error
});

const mapDispatchToProps = {
  fetchTraineeFormRPartAInitialValues: fetchTraineeFormRPartAInitialValues
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type formRPartAProps = ConnectedProps<typeof connector>;

class CreateFormRPartA extends React.PureComponent<formRPartAProps> {
  formRPartAService: FormRPartAService = new FormRPartAService();
  traineeReferenceService: TraineeReferenceService = new TraineeReferenceService();

  genders: KeyValue[] = [];
  qualifications: KeyValue[] = [];
  colleges: KeyValue[] = [];
  localOffices: KeyValue[] = [];
  immigrationStatuses: KeyValue[] = [];
  declarations: KeyValue[] = [];
  trainingLevel: KeyValue[] = [];

  componentDidMount() {
    this.props.fetchTraineeFormRPartAInitialValues();

    this.traineeReferenceService.getGenders().then(response => {
      this.genders = this.getOptionsFromResponse(response);
    });

    this.traineeReferenceService.getQualifications().then(response => {
      this.qualifications = this.getOptionsFromResponse(response);
    });

    this.traineeReferenceService.getColleges().then(response => {
      this.colleges = this.getOptionsFromResponse(response);
    });

    this.traineeReferenceService.getLocalOffices().then(response => {
      this.localOffices = this.getOptionsFromResponse(response);
    });

    this.immigrationStatuses = this.traineeReferenceService
      .getImmigrationStatuses()
      .map<KeyValue>(d => {
        return {
          label: d,
          value: d
        };
      });

    this.declarations = this.traineeReferenceService
      .getDeclarations()
      .map<KeyValue>(d => {
        return {
          label: d,
          value: d
        };
      });

    this.trainingLevel = [
      { label: "Full Time", value: "1" },
      { label: "90%", value: "0.9" },
      { label: "80%", value: "0.8" },
      { label: "70%", value: "0.7" },
      { label: "60%", value: "0.6" },
      { label: "50%", value: "0.5" },
      { label: "40%", value: "0.4" },
      { label: "30%", value: "0.3" },
      { label: "20%", value: "0.2" },
      { label: "10%", value: "0.1" }
    ];
  }

  render() {
    const { initialFormValues, history, isLoaded, error } = this.props;
    if (error) {
      return <div>Error: Failed to load data</div>;
    } else if (!isLoaded || !initialFormValues) {
      return <div>Loading...</div>;
    } else {
      return (
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
          <Formik
            validateOnChange={true}
            initialValues={initialFormValues}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              this.formRPartAService
                .saveTraineeFormRPartA(values)
                .then(res => history.push("/formr-a"));
              setSubmitting(false);
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <Form>
                <Fieldset>
                  <Fieldset.Legend isPageHeading>
                    Form-R (Part A)
                  </Fieldset.Legend>
                  <Label>
                    Trainee registration for Postgraduate Speciality Training
                  </Label>
                </Fieldset>
                <WarningMessage />
                <Fieldset name="personalDetails">
                  <h2>Personal details</h2>
                  <TextInputField label="Forename(s)" name="forename" />
                  <TextInputField
                    label="Surname (GMC-Registered)"
                    name="surname"
                  />
                  <TextInputField label="GMC Number" name="gmcNumber" />
                  <SelectInputField
                    label="Deanery / HEE Local Office"
                    options={this.localOffices}
                    name="localOfficeName"
                  />
                  <TextInputField
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                  />
                  <SelectInputField
                    label="Gender"
                    options={this.genders}
                    name="gender"
                  />
                  <SelectInputField
                    label="Immigration Status"
                    name="immigrationStatus"
                    options={this.immigrationStatuses}
                  />
                  {values.immigrationStatus === "Other" ? (
                    <TextInputField
                      name="otherImmigrationStatus"
                      onSubmit={() =>
                        setFieldValue("immigrationStatus", "Other")
                      }
                      placeholder="Please add your 'Other' immigration status"
                    />
                  ) : null}
                  <SelectInputField
                    label="Primary Qualification (most recent)"
                    name="qualification"
                    options={this.qualifications}
                  />
                  <TextInputField
                    label="Date Awarded"
                    type="date"
                    name="dateAttained"
                  />
                  <TextInputField
                    label="Medical School Awarding Primary Qualification (name and
                    country)"
                    name="medicalSchool"
                  />
                  <TextInputField
                    label="Home Address"
                    name="address1"
                    placeholder="House number, name / road"
                  />
                  <TextInputField name="address2" placeholder="district" />
                  <TextInputField name="address3" placeholder="town or city" />
                  <TextInputField name="address4" placeholder="country" />
                  <TextInputField name="postCode" placeholder="postcode" />
                  <TextInputField
                    label="Contact Telephone (landline)"
                    name="telephoneNumber"
                  />
                  <TextInputField
                    label="Contact Telephone (Mobile)"
                    name="mobileNumber"
                  />
                  <TextInputField label="Email" name="email" />
                </Fieldset>

                <Fieldset name="declarations">
                  <h2>Declarations</h2>

                  <Radios
                    name="declarationType"
                    error={errors.declarationType}
                    style={{ marginBottom: 30 }}
                  >
                    <Label>I confirm that,</Label>

                    {this.declarations.map(d => (
                      <Radios.Radio
                        key={d.label}
                        id={d.value}
                        checked={values.declarationType === d.value}
                        onChange={() =>
                          setFieldValue("declarationType", d.value)
                        }
                      >
                        {d.label}
                      </Radios.Radio>
                    ))}
                  </Radios>

                  <TextInputField
                    label="Programme Specialty"
                    name="programmeSpecialty"
                  />
                  {values.declarationType ===
                  "I have been appointed to a programme leading to award of CCT" ? (
                    <>
                      <TextInputField
                        label="Specialty 1 for Award of CCT"
                        name="cctSpecialty1"
                      />
                      <TextInputField
                        label="Specialty 2 for Award of CCT"
                        name="cctSpecialty2"
                      />
                    </>
                  ) : null}
                  <SelectInputField
                    label="Royal College / Faculty Assessing Training for the Award of
                    CCT"
                    name="college"
                    options={this.colleges}
                  />
                  <TextInputField
                    label="Anticipated Completion Date of Current Programme (if known)"
                    type="date"
                    name="completionDate"
                  />
                </Fieldset>

                <Fieldset name="programme">
                  <h2>Programme</h2>
                  <TextInputField label="Training Grade" name="trainingGrade" />
                  <TextInputField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={values.startDate}
                  />
                  <TextInputField
                    label="Post type / Appointment"
                    name="programmeMembershipType"
                    placeholder="programmeMembership type"
                  />
                  <SelectInputField
                    label="Full Time or % of Full Time Training"
                    name="wholeTimeEquivalent"
                    options={this.trainingLevel}
                  />
                </Fieldset>

                {[...Object.values(errors)].length > 0 ? (
                  <ErrorSummary>
                    <h3>Check the following</h3>
                    {Object.values(errors).map((errorMsg, i) => (
                      <ErrorSummary.Item key={i}>{errorMsg}</ErrorSummary.Item>
                    ))}
                  </ErrorSummary>
                ) : null}
                <Button
                  type="submit"
                  disabled={[...Object.values(errors)].length > 0}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </>
      );
    }
  }

  private getOptionsFromResponse(response: AxiosResponse<any[]>): KeyValue[] {
    return response.data.map<KeyValue>(d => {
      return {
        label: d.label,
        value: d.label
      };
    });
  }
}

export default withRouter(connector(CreateFormRPartA));
