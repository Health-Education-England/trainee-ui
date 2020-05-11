import React from "react";
import { WarningCallout } from "nhsuk-react-components";

const WarningMessage = () => {
  return (
    <WarningCallout style={{ textAlign: "justify" }}>
      <h3 className="nhsuk-warning-callout__label">Important</h3>
      <p>
        This form has been pre-populated using the information available against
        your records within the Trainee Information System (TIS). Please check
        all details and either amend them within the relevant system (see
        guidance in the form), or speak to your local office to amend them on
        your behalf. By singing this document you are confirming that ALL
        DETAILS (pre-populated or entered by you) are correct. It remains your
        own responsibility to keep your Designated Body and the GMC informed as
        soon as possible of any changes to your contact details. Your HEE Local
        team remains your Designated Body throughout your time in training. You
        can update your Designated Body on your GMC Online account under “My
        Revalidation”.
      </p>
    </WarningCallout>
  );
};

export default WarningMessage;
