import React from "react";
import { WarningCallout } from "nhsuk-react-components";

const WarningMessage = () => {
  return (
    <WarningCallout style={{ textAlign: "justify" }}>
      <h3 className="nhsuk-warning-callout__label">Important</h3>
      <p>
        If the form is pre-populated by the Deanery / HEE local team. Please
        check all details and correct where necessary.{" "}
        <b>
          By submitting this document you are confirming that all details
          (pre-populated and entered by you) are correct.{" "}
        </b>
        It remains your own responsibility to keep your Designated Body and the
        GMC informed as soon as possible of any change to your contact details.
        Your Deanery/HEE local team remains your Designated Body throughout your
        training. You can update your Designated Body on your GMC Online account
        under 'My Revalidation'.
      </p>
    </WarningCallout>
  );
};

export default WarningMessage;
