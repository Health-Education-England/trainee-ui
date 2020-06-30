import React, { FunctionComponent } from "react";
import ScrollTo from "../../ScrollTo";
import { Fieldset, Pagination, Panel } from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { SectionProps } from "./SectionProps";
import MultiChoiceInputField from "../../MultiChoiceInputField";
import { Section7ValidationSchema } from "../ValidationSchema";
import {
  FORMR_PARTB_ACCEPTANCE,
  FORMR_PARTB_CONSENT
} from "../../../../utilities/Constants";

const Section7: FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { formData, previousSection, nextSection, history } = props;

  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={Section7ValidationSchema}
        onSubmit={values => {
          nextSection(values);
          history.push("/formr-b/confirm");
        }}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <ScrollTo />
            <Fieldset
              disableErrorLine={true}
              name="currentDeclarations"
              data-jest="mainFieldset7"
            >
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldset7"
              >
                Section 7: Declaration
              </Fieldset.Legend>

              <Panel label="Declaration" data-cy="declaration">
                <MultiChoiceInputField
                  label="I confirm that,"
                  id="isDeclarationAccepted"
                  type="checkbox"
                  name="isDeclarationAccepted"
                  items={[
                    {
                      label: FORMR_PARTB_ACCEPTANCE,
                      value: true
                    }
                  ]}
                />

                <MultiChoiceInputField
                  label="I confirm that,"
                  id="isConsentAccepted"
                  type="checkbox"
                  name="isConsentAccepted"
                  items={[
                    {
                      label: FORMR_PARTB_CONSENT,
                      value: true
                    }
                  ]}
                />
              </Panel>
            </Fieldset>

            <Pagination>
              <Pagination.Link
                previous
                onClick={() => previousSection(values)}
                data-jest="BacklinkToSection6"
                data-cy="BacklinkToSection6"
              >
                Section 6
              </Pagination.Link>

              <Pagination.Link
                next
                onClick={() => handleSubmit()}
                data-jest="linkToSubmit"
                data-cy="linkToSubmit"
              >
                Continue to Submit
              </Pagination.Link>
            </Pagination>
          </Form>
        )}
      </Formik>
    )
  );
};

export default Section7;
