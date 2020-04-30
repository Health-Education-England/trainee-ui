import React from "react";
import { Fieldset, Label } from "nhsuk-react-components";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Create from "./Create";

const FormRPartB: React.FC = () => {
  return (
    <div>
      <Fieldset>
        <Fieldset.Legend isPageHeading>Form-R (Part B)</Fieldset.Legend>
        <Label>
          Self-declaration for the Revalidation of Doctors in Training
        </Label>
      </Fieldset>
      <BrowserRouter>
        <Switch>
          <Route path="/formr-b/" component={Create} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default FormRPartB;
