import React, { FunctionComponent } from "react";
import ScrollTo from "../../ScrollTo";
import { Fieldset, Panel, Label, WarningCallout } from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";
import MultiChoiceInputField from "../../MultiChoiceInputField";
import {
  YES_NO_OPTIONS,
  COVID_RESULT_DECLARATIONS,
  NEED_DISCUSSION_WITH_SUPERVISOR,
  NEED_DISCUSSION_WITH_SOMEONE
} from "../../../../utilities/Constants";
import { CovidSectionValidationSchema } from "../ValidationSchema";
import { BooleanUtilities } from "../../../../utilities/BooleanUtilities";
import TextInputField from "../../TextInputField";
import { KeyValue } from "../../../../models/KeyValue";

const CovidDeclaration: FunctionComponent<SectionProps> = (
  props: SectionProps
) => {
  const { formData, previousSection, nextSection, saveDraft } = props;

  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={CovidSectionValidationSchema}
        onSubmit={values => {
          nextSection(values, 7);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
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
                Trainee Self-assessment & declaration for use in ARCPs during
                COVID 19 Pandemic
              </Fieldset.Legend>
              <Label>
                Self-declaration and Educational supervisor validation for the
                Doctors in Training ARCPs during COVID 19 Pandemic
              </Label>

              <WarningCallout label="Important" data-cy="mainWarning5">
                <div>
                  <p>
                    <b>IMPORTANT:</b> Please pre-populate this form with the
                    information about your training since your last ARCP review,
                    or this is the first scheduled ARCP in your programme, since
                    the start of your current period of training.
                  </p>
                </div>
                <div>
                  Please comment on:
                  <ul>
                    <li>
                      Your self-assessment of progress up to the point of COVID
                      19
                    </li>
                    <li>
                      How your training may have been impacted by COVID 19 you
                      have not been able to acquire required
                      competencies/capabilities through lack of appropriate
                      learning opportunities or cancellation of required
                      exams/courses
                    </li>
                    <li>Any other relevant information</li>
                  </ul>
                </div>
                <div>
                  <p>
                    By signing this document, you are confirming that ALL
                    details are correct and that you have made an honest
                    declaration on accordance with the professional standards
                    set out by the General Medica Council in Good Medical
                    Practice.
                  </p>
                </div>
              </WarningCallout>

              <Panel label="Covid declarations" data-cy="complimentsPanel">
                <MultiChoiceInputField
                  label="Does your placement has been affected by Covid-19?"
                  id="haveCovidDeclarations"
                  name="haveCovidDeclarations"
                  type="radios"
                  items={YES_NO_OPTIONS}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    values.covidDeclarationDto = BooleanUtilities.ToBoolean(
                      e.target.value
                    )
                      ? {
                          selfRateForCovid: "",
                          reasonOfSelfRate: "",
                          otherInformationForPanel: "",
                          discussWithSupervisorChecked: false,
                          discussWithSomeoneChecked: false
                        }
                      : null;
                  }}
                />
              </Panel>

              {BooleanUtilities.ToBoolean(values.haveCovidDeclarations) ? (
                <>
                  <Panel label="Section 1: Trainee self-assessment of progress">
                    <Label>
                      <b>
                        1. Please self-rate your progress in your training since
                        your last ARCP using the three-point rating scale
                      </b>
                    </Label>

                    <MultiChoiceInputField
                      label=""
                      id="covidDeclarationDto.selfRateForCovid"
                      type="radios"
                      name="covidDeclarationDto.selfRateForCovid"
                      hint=""
                      items={COVID_RESULT_DECLARATIONS.map<KeyValue>(d => {
                        return {
                          label: d,
                          value: d
                        };
                      })}
                      conditional={
                        <TextInputField
                          label=""
                          name="covidDeclarationDto.reasonOfSelfRate"
                          rows={5}
                        />
                      }
                    />
                    <Label>
                      <b>
                        2. Please add other information you wish to provide for
                        the ARCP panel below
                      </b>
                    </Label>
                    <TextInputField
                      label=""
                      name="covidDeclarationDto.otherInformationForPanel"
                      rows={10}
                    />
                  </Panel>

                  <Panel label="Section 2: Trainee Check-In">
                    <Label>
                      <b>Please indicate in response to the following</b>
                    </Label>
                    <MultiChoiceInputField
                      id="covidDeclarationDto.discussWithSupervisorChecked"
                      type="checkbox"
                      name="covidDeclarationDto.discussWithSupervisorChecked"
                      hint=""
                      items={[
                        {
                          label: NEED_DISCUSSION_WITH_SUPERVISOR,
                          value: true
                        }
                      ]}
                    />
                    <MultiChoiceInputField
                      id="covidDeclarationDto.discussWithSomeoneChecked"
                      type="checkbox"
                      name="covidDeclarationDto.discussWithSomeoneChecked"
                      hint=""
                      items={[
                        {
                          label: NEED_DISCUSSION_WITH_SOMEONE,
                          value: true
                        }
                      ]}
                    />
                  </Panel>
                </>
              ) : null}
            </Fieldset>

            <FormRPartBPagination
              prevSection={6}
              nextSection={7}
              values={values}
              previousSection={previousSection}
              handleSubmit={handleSubmit}
              saveDraft={saveDraft}
            />
          </Form>
        )}
      </Formik>
    )
  );
};

export default CovidDeclaration;
