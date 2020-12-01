import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { loadTraineeProfile } from "../../redux/actions/trainee-profile-actions";
import { RootState } from "../../redux/reducers";

import { TraineeProfileService } from "../../services/TraineeProfileService";

import { Formik, Form } from "formik";

import { Fieldset, Button, Panel } from "nhsuk-react-components";

import TextInputField from "./TextInputField";

import Loading from "../common/Loading";

import ScrollTo from "../forms/ScrollTo";

const mapStateToProps = (state: RootState) => ({
  traineeProfile: state.profile.traineeProfile,
  isLoaded: state.profile.isLoaded
});

const mapDispatchToProps = {
  loadTraineeProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

class Feedback extends React.PureComponent<profileProps> {
  sendEmail(values: { feedback: string }) {
    console.log(values);
  }

  componentDidMount() {
    this.props.loadTraineeProfile(new TraineeProfileService());
  }

  render() {
    const { traineeProfile, isLoaded } = this.props;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        traineeProfile && (
          <div id="feedback">
            <ScrollTo />
            <Fieldset>
              <Fieldset.Legend isPageHeading>Feedback</Fieldset.Legend>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
                ad ipsum, magni architecto ratione in cumque nihil eveniet
                numquam. Molestias eos quibusdam libero accusantium officia
                consequuntur. Architecto ducimus laborum similique?
              </p>
              <Panel label="Submit your question">
                <Formik
                  initialValues={{ feedback: "" }}
                  onSubmit={values => this.sendEmail(values)}
                >
                  {({ values, errors }) => (
                    <Form>
                      <TextInputField
                        rows={10}
                        label="Enter your query"
                        name="feedback"
                        hidelabel={true}
                      />
                      <div className="nhsuk-grid-row">
                        <div className="nhsuk-grid-column-full">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Button data-cy="BtnSendEmail">Send</Button>
                          </div>
                        </div>
                      </div>{" "}
                    </Form>
                  )}
                </Formik>
              </Panel>
            </Fieldset>
          </div>
        )
      );
    }
  }
}
export default connector(Feedback);
