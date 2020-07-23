import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import ScrollTo from "../../ScrollTo";
import { Fieldset, Panel } from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";

const Section6: FunctionComponent<SectionProps> = (props: SectionProps) => {
  const {
    formData,
    previousSection,
    nextSection,
    saveDraft,
    showCovidDeclaration
  } = props;

  return (
    formData && (
      <Formik
        initialValues={formData}
        onSubmit={values => {
          nextSection(values, showCovidDeclaration ? 67 : 7);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <ScrollTo />
            <Fieldset
              disableErrorLine={true}
              name="currentDeclarations"
              data-jest="mainFieldset6"
            >
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldset6"
              >
                Section 6: Compliments
              </Fieldset.Legend>
              <Panel label="Compliments" data-cy="complimentsPanel">
                <TextInputField
                  name="compliments"
                  rows={15}
                  label=""
                  data-cy="compliments"
                  data-jest="compliments"
                  hint={
                    <span>
                      Compliments are another important piece of feedback. You
                      may wish to detail here any compliments that you have
                      received which are not already recorded in your portfolio,
                      to help give a better picture of your practice as a whole.
                      <strong>This section is not compulsory.</strong>
                    </span>
                  }
                />
              </Panel>
            </Fieldset>

            <FormRPartBPagination
              prevSection={5}
              nextSection={showCovidDeclaration ? 67 : 7}
              values={values}
              previousSection={previousSection}
              handleSubmit={handleSubmit}
              saveDraft={saveDraft}
              nextSectionLabel={
                showCovidDeclaration ? "Covid declaration" : "Section 7"
              }
            />
          </Form>
        )}
      </Formik>
    )
  );
};

export default Section6;
