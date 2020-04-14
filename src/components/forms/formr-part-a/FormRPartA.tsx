import React, { Component } from "react";
import { Fieldset, Label } from "nhsuk-react-components";
import { Route, Switch } from "react-router-dom";
import Create from "./Create";
import Confirm from "./Confirm";
import View from "./View";
import List from "./List";

class FormRPartA extends Component {
  render() {
    return (
      <div>
        <Fieldset>
          <Fieldset.Legend isPageHeading>Form-R (Part A)</Fieldset.Legend>
          <Label>
            Trainee registration for Postgraduate Speciality Training
          </Label>
        </Fieldset>
        <Switch>
          <Route path="/formr-a/create" component={Create} />
          <Route path="/formr-a/confirm" component={Confirm} />
          <Route path="/formr-a/:id" component={View} />
          <Route path="/" component={List} />
        </Switch>
      </div>
    );
  }
}

export default FormRPartA;
