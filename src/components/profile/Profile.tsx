import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styles from "./Profile.module.scss";
import { fetchPersonalDetails } from "../../redux/actions/personActions";
import { RootState } from "../../redux/types";
import PersonalDetailsComponent from "./personal-details/PersonalDetails";
import ProgrammesComponent from "./programmes/Programmes";
import PlacementsComponent from "./placements/Placements";

const mapStateToProps = (state: RootState) => ({
  personalDetails: state.persons.personalDetails,
  isLoaded: state.persons.isLoaded,
  error: state.persons.error
});

const mapDispatchToProps = {
  fetchPersonalDetails
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

class ProfileComponent extends React.PureComponent<profileProps> {
  componentDidMount() {
    this.props.fetchPersonalDetails();
  }

  render() {
    const { personalDetails, isLoaded, error } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        personalDetails && (
          <div className={styles.profileContainer}>
            <PersonalDetailsComponent personalDetails={personalDetails} />
            <PlacementsComponent
              placements={personalDetails.placements}
            ></PlacementsComponent>
            <ProgrammesComponent
              programmeMemberships={personalDetails.programmeMemberships}
            ></ProgrammesComponent>
          </div>
        )
      );
    }
  }
}

export default connector(ProfileComponent);
