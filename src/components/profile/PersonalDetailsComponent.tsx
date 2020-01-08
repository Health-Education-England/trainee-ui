import React from "react";
import { PersonalDetails } from "../../models/PersonalDetails";
import { ProfileService } from "../../services/ProfileService";

interface AppProps {}

interface AppState {
  isLoaded: boolean;
  data: PersonalDetails | null;
  error: any;
}

class PersonalDetailsComponent extends React.PureComponent<AppProps, AppState> {
  profileService: ProfileService;
  constructor(props: AppProps) {
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
          <div className="profile-content">
            <h2>Contact details</h2>
            <h6>
              {data.title}. {data.forenames} {data.surname}
            </h6>
            Email: <h4>{data.email}</h4>
            Gender: <h4>{data.mobileNumber}</h4>
            Address: <h4>{data.address1}</h4>
            <h5>
              {data.address2} {data.address3} {data.address4}
            </h5>
            Postcode: <h4>{data.postCode}</h4>
          </div>
        )
      );
    }
  }
}

export default PersonalDetailsComponent;
