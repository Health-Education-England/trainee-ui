import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import MultiChoiceInputField from "../../MultiChoiceInputField";
import ScrollTo from "../../ScrollTo";
import {
  Fieldset,
  WarningCallout,
  Pagination,
  Panel,
  ErrorSummary,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { FormRPartB } from "../../../../models/FormRPartB";
import { Section3ValidationSchema } from "../ValidationSchema";

interface Section3Props {
  formData: FormRPartB;
  previousSection: (formData: FormRPartB) => void;
  nextSection: (formData: FormRPartB) => void;
  history: any;
}

const Section3: FunctionComponent<Section3Props> = (props: Section3Props) => {
  const { formData, previousSection, nextSection, history } = props;
  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={Section3ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          nextSection(values);
          history.push("/formr-b/confirm");
          setSubmitting(false);
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <Form>
            <ScrollTo />
            <Fieldset data-jest="mainFieldset" name="declarationsOfGMP">
              <Fieldset.Legend headingLevel="H2" size="l">
                Section 3: Declarations relating to Good Medical Practice
              </Fieldset.Legend>
              <WarningCallout data-jest="mainWarning" label="Important">
                <p>
                  These declarations are compulsory and relate to the Good
                  Medical Practice guidance issued by the GMC. Honesty &
                  Integrity are at the heart of medical professionalism. This
                  means being honest and trustworthy and acting with integrity
                  in all areas of your practice, and is covered in Good Medical
                  Practice. A statement of health is a declaration that you
                  accept the professional obligations placed on you in Good
                  Medical Practice about your personal health. Doctors must not
                  allow their own health to endanger patients. Health is covered
                  in Good Medical Practice.
                </p>
              </WarningCallout>
              <Panel label="Declarations">
                <MultiChoiceInputField
                  label="Please tick to confirm your acceptance."
                  id="isHonest"
                  type="checkbox"
                  name="isHonest"
                  hint=""
                  items={[
                    {
                      label:
                        "I declare that I accept the professional obligations paced on me in Good Medical Practice in relation to honesty and integrity.",
                      value: true
                    }
                  ]}
                  footer="If you wish to make any declarations in relation to honesty and integrity, please do this in section 6"
                />

                <MultiChoiceInputField
                  label="Please tick to confirm your acceptance."
                  id="isHealthy"
                  name="isHealthy"
                  type="checkbox"
                  items={[
                    {
                      label:
                        "I declare that I accept the professional obligations placed on me in Good Medical Practice about my personal health.",
                      value: true
                    }
                  ]}
                />

                <MultiChoiceInputField
                  label="Do you have any GMC conditions, warnings or undertakings placed on you by the GMC, employing organisation or other organisations?"
                  id="isWarned"
                  name="isWarned"
                  type="radios"
                  items={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" }
                  ]}
                />

                {values.isWarned && values.isWarned.toString() === "true" ? (
                  <MultiChoiceInputField
                    label=""
                    id="isComplying"
                    name="isComplying"
                    type="checkbox"
                    items={[
                      {
                        label:
                          "If yes, are you complying with these conditions/undertakings?",
                        value: true
                      }
                    ]}
                  />
                ) : null}
              </Panel>

              <Panel label="Health statement">
                <TextInputField
                  name="healthStatement"
                  rows={15}
                  label="Health statement"
                  hint={
                    <span>
                      Writing something in this section below is{" "}
                      <strong>not compulsory</strong>. If you wish to declare
                      anything in relation to your health for which you feel it
                      would be beneficial that the ARCP/RITA panel or
                      Responsible Officer knew about, please do so below.
                    </span>
                  }
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
              <Pagination.Link previous onClick={() => previousSection(values)}>
                Section 2
              </Pagination.Link>

              <Pagination.Link next onClick={() => handleSubmit()}>
                Continue to Submit
              </Pagination.Link>
            </Pagination>
          </Form>
        )}
      </Formik>
    )
  );
};

export default Section3;
