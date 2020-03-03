import React from "react";
import { connect, ConnectedProps } from "react-redux";
import PersonalDetailsComponent from "../../components/personalDetails/PersonalDetails";
import styles from "./Profile.module.scss";
import { fetchPersonDetails } from "../actions/personActions";
import { RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  personalDetails: state.persons.personalDetails,
  isLoaded: state.persons.isLoaded,
  error: state.persons.error
});

const mapDispatchToProps = {
  fetchPersonDetails
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

class ProfileComponent extends React.PureComponent<profileProps> {
  componentDidMount() {
    this.props.fetchPersonDetails();
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
            <PersonalDetailsComponent personalDetail={personalDetails} />
          </div>
        )
      );
    }
  }
}

export default connector(ProfileComponent);
