import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { connect, ConnectedProps } from "react-redux";
import { Button, Panel } from "nhsuk-react-components";

import {
  FormParams,
  EmailTemplateParams
} from "../../models/FeedbackFormParams";
import { TraineeProfile } from "../../models/TraineeProfile";
import { ProgrammeMembership } from "../../models/ProgrammeMembership";
import { loadTraineeProfile } from "../../redux/actions/trainee-profile-actions";

import { RootState } from "../../redux/reducers";
import { TraineeProfileService } from "../../services/TraineeProfileService";

import TextInputField from "./TextInputField";
import Loading from "../common/Loading";
import ScrollTo from "./ScrollTo";

const mapStateToProps = (state: RootState) => ({
  traineeProfile: state.profile.traineeProfile,
  isLoaded: state.profile.isLoaded
});

const mapDispatchToProps = {
  loadTraineeProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

interface LocalState {
  sendingEmail: boolean;
  showForm: boolean;
  formSubmitted: boolean;
}

export interface LocalOfficeContact {
  name: string;
  email: string | null;
}

//https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type CurrentProgrammeMembership =
  | Partial<ProgrammeMembership>
  | undefined;

export class UnconnectedSupport extends React.PureComponent<
  profileProps,
  LocalState
> {
  constructor(props: profileProps) {
    super(props);
    this.state = { sendingEmail: false, showForm: false, formSubmitted: false };
  }

  localOfficeContacts: LocalOfficeContact[] = [
    {
      name: "Health Education England East Midlands",
      email: "TIS.EM@hee.nhs.uk"
    },
    {
      name: "Health Education England East of England",
      email: "TIS.EOE@hee.nhs.uk"
    },
    { name: "Health Education England Kent, Surrey and Sussex", email: null },
    {
      name: "Health Education England North Central and East London",
      email: null
    },
    {
      name: "Health Education England North East",
      email: "InformationTeam.NE@hee.nhs.uk"
    },
    {
      name: "Health Education England North West",
      email: "medicine.nw@hee.nhs.uk"
    },
    { name: "Health Education England North West London", email: null },
    { name: "Health Education England South London", email: null },
    {
      name: "Health Education England South West",
      email: "TISQueries.sw@hee.nhs.uk"
    },
    { name: "Health Education England Thames Valley", email: null },
    { name: "Health Education England Wessex", email: null },
    {
      name: "Health Education England West Midlands",
      email: "TIS.WM@hee.nhs.uk"
    },
    {
      name: "Health Education England Yorkshire and the Humber",
      email: "TIS.yh@hee.nhs.uk"
    },
    { name: "London LETBs", email: null },
    { name: "West of England", email: null }
  ];
  currentProgramme: CurrentProgrammeMembership = {};

  getLocalOfficeEmail(localOfficeName: string | undefined) {
    if (localOfficeName) {
      const currentLocalOffice = this.localOfficeContacts.find(
        (localOffice: LocalOfficeContact) => {
          return localOffice.name === localOfficeName;
        }
      );
      return currentLocalOffice ? currentLocalOffice.email : null;
    }
    return null;
  }
  setCurrentProgramme(profile: TraineeProfile): CurrentProgrammeMembership {
    return profile.programmeMemberships
      ? profile.programmeMemberships.find((programme: ProgrammeMembership) => {
          return programme.status === "CURRENT";
        })
      : {};
  }

  componentDidMount() {
    this.props
      .loadTraineeProfile(new TraineeProfileService())
      .then((response: any) => {
        this.currentProgramme = this.setCurrentProgramme(response.payload);
        this.getLocalOfficeEmail(this.currentProgramme?.managingDeanery)
          ? this.setState({ showForm: true })
          : this.setState({ showForm: false });
      });
  }

  mockSendEmail() {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve("some string");
      }, 3000);
    });
  }

  handleSubmit(values: FormParams) {
    this.setState({ sendingEmail: true });

    const templateParams: EmailTemplateParams = {
      surname:
        this.props.traineeProfile?.personalDetails?.surname ||
        "No surname associated with trainee profile",
      forenames:
        this.props.traineeProfile?.personalDetails?.forenames ||
        "No forename associated with trainee profile",
      email:
        this.props.traineeProfile?.personalDetails?.email ||
        "No email associated with trainee profile",
      gmcNumber:
        this.props.traineeProfile?.personalDetails?.gmcNumber ||
        "No GMC number associated with trainee profile",
      programmeName:
        this.currentProgramme?.programmeName ||
        "No current programme associated with trainee profile",
      localOffice:
        this.currentProgramme?.managingDeanery ||
        "No current deanery associated with trainee profile",
      localOfficeEmail: this.getLocalOfficeEmail(
        this.currentProgramme?.managingDeanery || "noreply@hee.nhs.uk"
      ),
      message: values.message
    };

    this.mockSendEmail()
      .then(
        response => {
          console.log(templateParams);
        },
        err => {}
      )

      .finally(() => {
        this.setState({ sendingEmail: false });
        this.setState({ formSubmitted: true });
      });
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

            <h1>Support</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint ad
              ipsum, magni architecto ratione in cumque nihil eveniet numquam.
              Molestias eos quibusdam libero accusantium officia consequuntur.
              Architecto ducimus laborum similique?
            </p>
            {this.state.formSubmitted && (
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#007f3b",
                  color: "white"
                }}
                className="nhsuk-u-font-size-19"
              >
                Message sent.
              </div>
            )}
            {this.state.showForm ? (
              <Panel label="Submit your question">
                <Formik
                  initialValues={{ message: "" }}
                  validationSchema={yup.object({
                    message: yup.string().required("Message is required!")
                  })}
                  onSubmit={(values, { resetForm }) => {
                    this.handleSubmit(values);
                    resetForm({});
                  }}
                >
                  {({ values, errors }) => (
                    <Form>
                      <TextInputField
                        rows={10}
                        label="Enter your query"
                        name="message"
                        hidelabel={true}
                        disabled={this.state.sendingEmail}
                      />
                      <div className="nhsuk-grid-row">
                        <div className="nhsuk-grid-column-full">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Button
                              disabled={this.state.sendingEmail}
                              data-cy="BtnSendEmail"
                            >
                              {this.state.sendingEmail ? (
                                <span>Sending...</span>
                              ) : (
                                <span>Send</span>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>{" "}
                    </Form>
                  )}
                </Formik>
              </Panel>
            ) : (
              <Panel label="How to get help">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  maiores voluptatum voluptas totam nostrum illum omnis harum
                  aliquid, distinctio id doloribus quos dignissimos iure, magni
                  odit quam. Odit, repudiandae asperiores.
                </p>
                <p>
                  <a href="https://lasepgmdesupport.hee.nhs.uk/support/tickets/new?form_7=true">
                    PGMDE Support Portal
                  </a>
                </p>
              </Panel>
            )}
          </div>
        )
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedSupport);
