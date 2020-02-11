import React from "react";
import { PersonalDetails } from "../../models/PersonalDetails";
import ProgrammesComponent from "../programmes/ProgrammesComponent";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import { ProfileService } from "../../services/ProfileService";
import styles from "./ProfileComponent.module.scss";

interface IProps {}

interface IState {
  isLoaded: boolean;
  data: PersonalDetails | null;
  error: any;
}

class ProfileComponent extends React.PureComponent<IProps, IState> {
  profileService: ProfileService;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoaded: false,
      data: null,
      error: null
    };
    this.profileService = new ProfileService();
  }

  componentDidMount() {
    this.profileService
      .getPersonalDetails()
      .then(result => {
        this.setState({
          isLoaded: true,
          data: result.data,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: false,
          data: null,
          error: error
        });
      });
  }

  render() {
    const { isLoaded, data, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        data && (
          <div className={styles.profileContainer}>
            <PersonalDetailsComponent personalDetail={data} />
            <ProgrammesComponent
              programmeMemberships={data.programmeMemberships}
            />
          </div>
        )
      );
    }
  }
}

export default ProfileComponent;
