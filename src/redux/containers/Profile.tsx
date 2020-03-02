import React from "react";
import { connect } from "react-redux";
import PersonalDetailsComponent from "../../components/personalDetails/PersonalDetails";
import styles from "./Profile.module.scss";
import { fetchPersonDetails } from "../actions/personActions";

class ProfileComponent extends React.PureComponent<any> {
  componentDidMount() {
    this.props.fetchPersonDetails();
  }

  render() {
    const personDetails = this.props.personReducer.personalDetails;
    const isLoaded = this.props.personReducer.isLoaded;
    const error = this.props.personReducer.error;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        personDetails && (
          <div className={styles.profileContainer}>
            <PersonalDetailsComponent personalDetail={personDetails} />
          </div>
        )
      );
    }
  }
}

const mapStateToProps = (state: {
  personReducer: { personalDetails: any; isLoaded: boolean; error: any };
}) => ({
  personReducer: {
    personalDetails: state.personReducer.personalDetails.data,
    isLoaded: state.personReducer.isLoaded,
    error: state.personReducer.error
  }
});

export default connect(mapStateToProps, { fetchPersonDetails })(
  ProfileComponent
);
