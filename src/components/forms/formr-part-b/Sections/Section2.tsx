import React, { useState } from "react";
import SelectInputField from "../../SelectInputField";
import TextInputField from "../../TextInputField";
import { Button, Fieldset } from "nhsuk-react-components";
import { Form, Formik } from "formik";

const Section2 = (props: any) => {
  const [direction, setDirection] = useState("back");
  const { curricula, formData, previousSection, submitForm, history } = props;
  return (
    <Formik
      initialValues={formData}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (direction === "back") {
          previousSection(values);
        } else {
          submitForm(values);
          history.push("/formr-b/confirm");
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <Fieldset name="doctorsDetails">
            <h2>Scope of Practice</h2>
            <TextInputField label="Forename(s)" name="forename" />
            <SelectInputField
              label="Dual Specialty (if applicable)"
              name="dualSpecialty"
              options={curricula}
            />
          </Fieldset>

          <Button type="submit" onClick={() => setDirection("back")}>
            Back
          </Button>
          <Button type="submit" onClick={() => setDirection("continue")}>
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Section2;
