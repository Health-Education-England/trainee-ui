import React from "react";
import { Formik, Form } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  Label,
  Fieldset,
  Radios,
  Button,
  ErrorSummary,
  BackLink
} from "nhsuk-react-components";
import { fetchTraineeFormRPartAInitialValues } from "../../../redux/actions/trainee-form-actions";
import {
  TrainingLevels,
  DeclarationOptions,
  ImmigrationStatusOptions
} from "./DropdownOptions";
import SelectInputField from "./SelectInputField";
import TextInputField from "./TextInputField";
import WarningMessage from "./WarningMessage";
import ValidationSchema from "./ValidationSchema";
import { GenericOwnProps } from "../../../redux/types";
import { CCT_DECLARATION } from "./Constants";
import Loading from "../../common/Loading";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  initialFormValues: state.formRPartA.intialFormValues,
  genders: state.formRPartA.genderOptions,
  qualifications: state.formRPartA.qualifications,
  colleges: state.formRPartA.colleges,
  localOffices: state.formRPartA.localOffices,
  trainingGrades: state.formRPartA.grades,
  isLoaded: state.formRPartA.isLoaded,
  history: ownProps.history,
  location: ownProps.location
});

const mapDispatchProps = {
  fetchTraineeFormRPartAInitialValues
};

const connector = connect(mapStateToProps, mapDispatchProps);

class CreateFormRPartA extends React.PureComponent<
  ConnectedProps<typeof connector>
> {
  componentDidMount() {
    this.props.fetchTraineeFormRPartAInitialValues();
  }

  render() {
    const {
      initialFormValues,
      genders,
      qualifications,
      colleges,
      localOffices,
      trainingGrades,
      isLoaded
    } = this.props;

    if (!isLoaded || !initialFormValues) {
      return <Loading />;
    } else {
      const formData = this.props.location.formData || initialFormValues;
      return (
        <>
          <BackLink href="/formr-a">Go back</BackLink>
          <Formik
            validateOnChange={true}
            initialValues={formData}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              this.props.history.push({
                pathname: "/formr-a/confirm",
                state: { formData: values }
              });

              setSubmitting(false);
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <Form>
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
                    options={localOffices}
                    name="localOfficeName"
                  />
                  <TextInputField
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                  />
                  <SelectInputField
                    label="Gender"
                    options={genders}
                    name="gender"
                  />
                  <SelectInputField
                    label="Immigration Status"
                    name="immigrationStatus"
                    options={ImmigrationStatusOptions}
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
                    options={qualifications}
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

                  <Radios name="declarationType" style={{ marginBottom: 30 }}>
                    <Label>I confirm that,</Label>

                    {DeclarationOptions.map(d => (
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
                  {values.declarationType === CCT_DECLARATION ? (
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
                    options={colleges}
                  />
                  <TextInputField
                    label="Anticipated Completion Date of Current Programme (if known)"
                    type="date"
                    name="completionDate"
                  />
                </Fieldset>

                <Fieldset name="programme">
                  <h2>Programme</h2>
                  <SelectInputField
                    label="Training Grade"
                    name="trainingGrade"
                    options={trainingGrades}
                  />
                  <TextInputField
                    label="Start Date"
                    type="date"
                    name="startDate"
                  />
                  <TextInputField
                    label="Post type / Appointment"
                    name="programmeMembershipType"
                    placeholder="programmeMembership type"
                  />
                  <SelectInputField
                    label="Full Time or % of Full Time Training"
                    name="wholeTimeEquivalent"
                    options={TrainingLevels}
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
                <Button type="submit">Confirm</Button>
              </Form>
            )}
          </Formik>
        </>
      );
    }
  }
}

export default connector(CreateFormRPartA);
