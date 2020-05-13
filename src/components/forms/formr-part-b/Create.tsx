import React from "react";
import { Formik, Form } from "formik";
import { Fieldset, Button, Panel, ErrorSummary } from "nhsuk-react-components";
import SelectInputField from "../SelectInputField";
import TextInputField from "../TextInputField";
import WarningMessage from "../WarningMessage";
import { ProfileToFormRPartBInitialValuesMapping } from "./ProfileToFormRPartBInitialValuesMapping";
import { RootState } from "../../../redux/reducers";
import { GenericOwnProps } from "../../../redux/types";
import { connect, ConnectedProps } from "react-redux";
import { loadFormRPartB } from "../../../redux/actions/formr-partb-actions";
import { loadTraineeProfile } from "../../../redux/actions/trainee-profile-actions";
import { loadReferenceData } from "../../../redux/actions/reference-data-actions";
import { TraineeProfileService } from "../../../services/TraineeProfileService";
import { TraineeReferenceService } from "../../../services/TraineeReferenceService";
import Loading from "../../common/Loading";
import ValidationSchema from "./ValidationSchema";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  initialFormValues: ProfileToFormRPartBInitialValuesMapping(
    state.profile.traineeProfile
  ),
  localOffices: state.referenceData.localOffices,
  curricula: state.referenceData.curricula,
  isLoaded: state.referenceData.isLoaded,
  history: ownProps.history,
  location: ownProps.location
});

const mapDispatchProps = {
  loadTraineeProfile,
  loadReferenceData,
  loadFormRPartB
};

const connector = connect(mapStateToProps, mapDispatchProps);

class Create extends React.PureComponent<ConnectedProps<typeof connector>> {
  componentDidMount() {
    this.props.loadTraineeProfile(new TraineeProfileService());
    this.props.loadReferenceData(new TraineeReferenceService());
  }

  render() {
    const { initialFormValues, localOffices, curricula, isLoaded } = this.props;

    if (!isLoaded || !initialFormValues) {
      return <Loading />;
    } else {
      const formData = this.props.location.formData || initialFormValues;

      if (localOffices.length > 0) {
        if (!localOffices.some(l => l.label === formData.localOfficeName)) {
          formData.localOfficeName = "";
        }

        if (!localOffices.some(l => l.label === formData.prevRevalBody)) {
          formData.prevRevalBody = "";
        }
      }

      if (
        curricula.length > 0 &&
        !curricula.some(l => l.label === formData.programmeSpecialty)
      ) {
        formData.programmeSpecialty = "";
      }

      return (
        <>
          <Formik
            validateOnChange={true}
            initialValues={formData}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              this.props.loadFormRPartB(values);
              this.props.history.push("/formr-b/confirm");
              setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <WarningMessage />
                <Panel>
                  <em>
                    Failure to appropriately complete a Form R Part B when
                    requested may result in an Outcome 5 at ARCP (
                    <b>Please refer to latest edition of the Gold Guide</b>).
                  </em>
                </Panel>

                <Fieldset name="doctorsDetails">
                  <h2>Doctor's details</h2>
                  <TextInputField label="Forename(s)" name="forename" />
                  <TextInputField
                    label="Surname (GMC-Registered)"
                    name="surname"
                  />
                  <TextInputField label="GMC Number" name="gmcNumber" />
                  <TextInputField
                    label="Primary contact email address"
                    name="email"
                  />
                  <SelectInputField
                    label="Current Deanery / HEE Local team"
                    options={localOffices}
                    name="localOfficeName"
                  />
                  <SelectInputField
                    label="Previous Designated Body for Revalidation (if applicable)"
                    options={localOffices}
                    name="prevRevalBody"
                  />
                  <TextInputField
                    label="Current Revalidation Date"
                    type="date"
                    name="currRevalDate"
                  />
                  <TextInputField
                    label="Date of Previous Revalidation (if applicable)"
                    type="date"
                    name="prevRevalDate"
                  />
                  <SelectInputField
                    label="Programme / Training Specialty"
                    name="programmeSpecialty"
                    options={curricula}
                  />
                  <SelectInputField
                    label="Dual Specialty (if applicable)"
                    name="dualSpecialty"
                    options={curricula}
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

                <Button type="submit">Continue</Button>
              </Form>
            )}
          </Formik>
        </>
      );
    }
  }
}

export default connector(Create);
