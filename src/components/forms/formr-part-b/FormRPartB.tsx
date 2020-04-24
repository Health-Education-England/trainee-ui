import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Form, Fieldset, Label } from "nhsuk-react-components";

const validationSchema = yup.object({
  forenames: yup
    .string()
    .required()
    .max(50)
});

const FormRPartB: React.FC = () => {
  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={{
          surname: "",
          forenames: "",
          declarationType: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => console.log("submit: ", data), 3000);
          setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <Fieldset>
              <Fieldset.Legend isPageHeading>Form-R (Part B)</Fieldset.Legend>
            </Fieldset>
            <Label>Coming soon...</Label>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRPartB;
