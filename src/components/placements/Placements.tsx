import React from "react";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PlacementPanel } from "./PlacementPanel";
import { Placement } from "../../models/Placement";
import { ProfileService } from "../../services/ProfileService";
import styles from "./Placements.module.scss";

interface IPlacementsComponentProps {
  placements: Placement[];
}

interface IPlacementsState {
  isLoaded: boolean;
  placements: Placement[] | null;
  error: any;
}

class Placements extends React.PureComponent<
  IPlacementsComponentProps,
  IPlacementsState
> {
  profileService: ProfileService;

  constructor(props: IPlacementsComponentProps) {
    super(props);

    this.state = {
      isLoaded: false,
      placements: null,
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
          placements: result.data.placements,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: false,
          placements: [],
          error: error
        });
      });
  }

  render() {
    const { isLoaded, placements, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        isLoaded &&
        placements && (
          <section>
            <Divider />
            <div>
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={styles.heading}>Placements</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ width: "100%" }}>
                    {placements.length === 0 ? (
                      <div>You are not assigned to any placement</div>
                    ) : (
                      placements.map(
                        (
                          placement: Placement,
                          index: string | number | undefined
                        ) => (
                          <PlacementPanel key={index} placement={placement} />
                        )
                      )
                    )}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </section>
        )
      );
    }
  }
}

export default Placements;
