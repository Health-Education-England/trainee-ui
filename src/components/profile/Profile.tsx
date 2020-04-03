import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchTraineeProfile } from "../../redux/actions/trainee-profile-actions";
import { RootState } from "../../redux/types";
import PersonalDetailsComponent from "./personal-details/PersonalDetails";
import Programmes from "./programmes/Programmes";
import Placements from "./placements/Placements";
import Loading from "../common/Loading";
import { Fieldset } from "nhsuk-react-components";

const mapStateToProps = (state: RootState) => ({
  traineeProfile: state.person.traineeProfile,
  isLoaded: state.person.isLoaded
});

const mapDispatchToProps = {
  fetchTraineeProfile: fetchTraineeProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

class Profile extends React.PureComponent<profileProps> {
  componentDidMount() {
    this.props.fetchTraineeProfile();
  }

  render() {
    const { traineeProfile, isLoaded } = this.props;

    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        traineeProfile && (
          <div>
            <Fieldset>
              <Fieldset.Legend isPageHeading>Profile</Fieldset.Legend>
            </Fieldset>
            <PersonalDetailsComponent
              personalDetails={traineeProfile.personalDetails}
            />
            <Placements placements={traineeProfile.placements}></Placements>
            <Programmes
              programmeMemberships={traineeProfile.programmeMemberships}
            ></Programmes>
          </div>
        )
      );
    }
  }
}

export default connector(Profile);
