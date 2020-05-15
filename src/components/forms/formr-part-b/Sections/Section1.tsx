import React from "react";
import SelectInputField from "../../SelectInputField";
import TextInputField from "../../TextInputField";
import WarningMessage from "../../WarningMessage";
import { Button, Panel, Fieldset, ErrorSummary } from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { Section1ValidationSchema } from "../ValidationSchema";

const Section1 = (props: any) => {
  const { localOffices, curricula, formData, nextSection } = props;
  return (
    <Formik
      initialValues={formData}
      validationSchema={Section1ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        nextSection(values);
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <WarningMessage />
          <Panel>
            <em>
              ppropriately complete a Form R Part B when requested may result in
              an Outcome 5 at ARCP (
              <b>Please refer to latest edition of the Gold Guide</b>).
            </em>
          </Panel>

          <Fieldset name="doctorsDetails">
            <h2>Doctor's details</h2>
            <TextInputField label="Forename(s)" name="forename" />
            <TextInputField label="Surname (GMC-Registered)" name="surname" />
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
  );
};

export default Section1;
