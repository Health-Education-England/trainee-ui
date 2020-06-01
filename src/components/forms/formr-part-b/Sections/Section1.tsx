import React, { FunctionComponent } from "react";
import SelectInputField from "../../SelectInputField";
import TextInputField from "../../TextInputField";
import ScrollTo from "../../ScrollTo";
import {
  Fieldset,
  ErrorSummary,
  WarningCallout,
  Pagination,
  Panel,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { Section1ValidationSchema } from "../ValidationSchema";
import { KeyValue } from "../../../../models/KeyValue";
import { FormRPartB } from "../../../../models/FormRPartB";

interface Section1Props {
  localOffices: KeyValue[];
  curricula: KeyValue[];
  formData: FormRPartB;
  nextSection: (formData: FormRPartB) => void;
}

const Section1: FunctionComponent<Section1Props> = (props: Section1Props) => {
  const { localOffices, curricula, formData, nextSection } = props;
  return (
    <Formik
      initialValues={formData}
      validationSchema={Section1ValidationSchema}
      onSubmit={values => {
        nextSection(values);
      }}
    >
      {({ values, errors, handleSubmit }) => (
        <Form>
          <ScrollTo />
          <Fieldset name="doctorsDetails">
            <Fieldset.Legend headingLevel="H2" size="l">
              Section 1: Doctor's details
            </Fieldset.Legend>

            <WarningCallout label="Important">
              <p>
                This form has been pre-populated using the information available
                against your records within the Trainee Information System
                (TIS). Please check all details and amend where necessary.
                Amendments made to your details on this form will not update
                other systems that you may have access to. By submitting this
                document you are confirming that ALL DETAILS (pre-populated or
                entered/amended by you) are correct.
                <br />
                <br /> It remains your own responsibility to keep your
                Designated Body and the GMC informed as soon as possible of any
                changes to your contact details. Your HEE Local team remains
                your Designated Body throughout your time in training. You can
                update your Designated Body on your GMC Online account under "My
                Revalidation".
                <br />
                <br /> Failure to appropriately complete a Form R Part B when
                requested may result in an Outcome 5 at ARCP{" "}
                <b>(Please refer to latest edition of the Gold Guide)</b>.
              </p>
            </WarningCallout>

            <Panel label="Personal details">
              <TextInputField label="Forename(s)" name="forename" />
              <TextInputField label="Surname (GMC-Registered)" name="surname" />
              <TextInputField label="GMC Number" name="gmcNumber" />
              <TextInputField
                label="Primary contact email address"
                name="email"
                hint="For reasons of security and due to frequent system failures with internet email accounts, you are strongly advised to provide an NHS.net email address."
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
            </Panel>
          </Fieldset>

          {[...Object.values(errors)].length > 0 ? (
            <ErrorSummary
              aria-labelledby="errorSummaryTitle"
              role="alert"
              tabIndex={-1}
            >
              <ErrorMessage>Please check highlighted fields</ErrorMessage>
            </ErrorSummary>
          ) : null}

          <Pagination>
            <Pagination.Link next onClick={() => handleSubmit()}>
              Section 2
            </Pagination.Link>
          </Pagination>
        </Form>
      )}
    </Formik>
  );
};

export default Section1;
