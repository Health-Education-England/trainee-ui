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
import { loadFormRPartA } from "../../../redux/actions/formr-parta-actions";
import SelectInputField from "./SelectInputField";
import TextInputField from "./TextInputField";
import WarningMessage from "./WarningMessage";
import ValidationSchema from "./ValidationSchema";
import { GenericOwnProps } from "../../../redux/types";
import { CCT_DECLARATION } from "./Constants";
import Loading from "../../common/Loading";
import { ProfileToFormRPartAInitialValuesMapping } from "./ProfileToFormRPartAInitialValuesMapping";
import { loadTraineeProfile } from "../../../redux/actions/trainee-profile-actions";
import { TraineeProfileService } from "../../../services/TraineeProfileService";
import { loadReferenceData } from "../../../redux/actions/reference-data-actions";

const Declarations = [
  CCT_DECLARATION,
  "I will be seeking specialist registration by application for a CESR",
  "I will be seeking specialist registration by application for a CESR CP",
  "I will be seeking specialist registration by application for a CEGPR",
  "I will be seeking specialist registration by application for a CEGPR CP",
  "I am a CORE trainee, not yet eligible for CCT"
];

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  initialFormValues: ProfileToFormRPartAInitialValuesMapping(
    state.profile.traineeProfile
  ),
  genders: state.referenceData.genders,
  qualifications: state.referenceData.qualifications,
  colleges: state.referenceData.colleges,
  localOffices: state.referenceData.localOffices,
  trainingGrades: state.referenceData.grades,
  immigrationStatus: state.referenceData.immigrationStatus,
  curricula: state.referenceData.curricula,
  isLoaded: state.referenceData.isLoaded,
  history: ownProps.history,
  location: ownProps.location
});

const mapDispatchProps = {
  loadTraineeProfile,
  loadReferenceData,
  loadFormRPartA
};

const connector = connect(mapStateToProps, mapDispatchProps);

class CreateFormRPartA extends React.PureComponent<
  ConnectedProps<typeof connector>
> {
  componentDidMount() {
    this.props.loadTraineeProfile(new TraineeProfileService());
    this.props.loadReferenceData();
  }

  render() {
    const {
      initialFormValues,
      genders,
      qualifications,
      colleges,
      localOffices,
      trainingGrades,
      immigrationStatus,
      curricula,
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

              this.props.loadFormRPartA(values);
              this.props.history.push("/formr-a/confirm");

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
                    options={immigrationStatus}
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

                    {Declarations.map(label => (
                      <Radios.Radio
                        key={label}
                        id={label}
                        checked={values.declarationType === label}
                        onChange={() => setFieldValue("declarationType", label)}
                      >
                        {label}
                      </Radios.Radio>
                    ))}
                  </Radios>

                  <SelectInputField
                    label="Programme Specialty"
                    name="programmeSpecialty"
                    options={curricula}
                  />
                  {values.declarationType === CCT_DECLARATION ? (
                    <>
                      <SelectInputField
                        label="Specialty 1 for Award of CCT"
                        name="cctSpecialty1"
                        options={curricula}
                      />
                      <SelectInputField
                        label="Specialty 2 for Award of CCT"
                        name="cctSpecialty2"
                        options={curricula}
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
                  <TextInputField
                    label="Full Time or % of Full Time Training"
                    name="wholeTimeEquivalent"
                    placeholder="E.g. 0.1 for 10%; 0.25 for 25% etc or 1 for Full time"
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
