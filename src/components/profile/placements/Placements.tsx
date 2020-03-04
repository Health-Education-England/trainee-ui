import React from "react";
import { connect } from "react-redux";
import { fetchPersonDetails } from "../../../redux/actions/personActions";

import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PlacementPanel } from "./PlacementPanel";
import { Placement } from "../../../models/Placement";
import styles from "./Placements.module.scss";

class Placements extends React.PureComponent<any> {
  componentDidMount() {
    this.props.fetchPersonDetails();
  }

  render() {
    const personDetails = this.props.personReducer.personalDetails;
    const isLoaded = this.props.personReducer.isLoaded;
    const error = this.props.personReducer.error;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        personDetails && (
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
                    {personDetails.placements.length === 0 ? (
                      <div>You are not assigned to any placement</div>
                    ) : (
                      personDetails.placements.map(
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

const mapStateToProps = (state: {
  personReducer: { personalDetails: any; isLoaded: boolean; error: any };
}) => ({
  personReducer: {
    personalDetails: state.personReducer.personalDetails.data,
    isLoaded: state.personReducer.isLoaded,
    error: state.personReducer.error
  }
});

export default connect(mapStateToProps, { fetchPersonDetails })(Placements);
