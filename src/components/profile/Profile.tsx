import React from "react";
import { connect } from "react-redux";
import ProgrammesComponent from "../programmes/Programmes";
import PersonalDetailsComponent from "../personalDetails/PersonalDetails";
import styles from "./Profile.module.scss";
import { fetchPersonDetails } from "../../actions/personActions";

class ProfileComponent extends React.PureComponent<any> {
  componentDidMount() {
    this.props.fetchPersonDetails();
  }

  render() {
    const personDetails = this.props.personReducer.personalDetails;
    if (personDetails !== undefined) {
      return (
        personDetails && (
          <div className={styles.profileContainer}>
            <PersonalDetailsComponent personalDetail={personDetails} />
            <ProgrammesComponent
              programmeMemberships={personDetails.programmeMemberships}
            />
          </div>
        )
      );
    } else return <div>Nothing coming through</div>;
  }
}

const mapStateToProps = (state: {
  personReducer: { personalDetails: any; isLoaded: boolean; error: any };
}) => ({
  personReducer: {
    personalDetails: state.personReducer.personalDetails.data
  }
});

export default connect(mapStateToProps, { fetchPersonDetails })(
  ProfileComponent
);
