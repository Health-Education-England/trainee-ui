import React from "react";
import { Formik, Form } from "formik";
import { Fieldset, Button, Panel } from "nhsuk-react-components";
import SelectInputField from "../SelectInputField";
import TextInputField from "../TextInputField";
import WarningMessage from "../WarningMessage";

const tempInitialValues = {};

export default class CreateFormRPartB extends React.PureComponent {
  render() {
    return (
      <>
        <Formik
          initialValues={tempInitialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            // TODO this.props.loadFormRPartB(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              <WarningMessage />
              <Panel>
                <em>
                  Failure to complete a Form R Part B when requested may result
                  in an Outcome 5 at ARCP (Gold Guide v6, 7.74).
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
                <SelectInputField
                  label="Deanery / HEE Local Office"
                  options={[]}
                  name="localOfficeName"
                />
                <SelectInputField
                  label="Previous Designated Revalidation Body"
                  options={[]}
                  name="previousRevalBody"
                />
                <TextInputField
                  label="Current Revalidation Date"
                  type="date"
                  name="currentRevalDate"
                />
                <TextInputField
                  label="Previous Revalidation Date"
                  type="date"
                  name="previousRevalDate"
                />
                <SelectInputField
                  label="Programme Specialty"
                  name="programmeSpecialty"
                  options={[]}
                />
                <SelectInputField
                  label="Dual Specialty"
                  name="dualSpecialty"
                  options={[]}
                />
              </Fieldset>

              <Button type="submit">Continue</Button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
