import React from "react";
import { connect } from "react-redux";
import { fetchPersonDetails } from "../../../redux/actions/personActions";

import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProgrammePanel } from "./ProgrammePanel";
import { ProgrammeMembership } from "../../../models/ProgrammeMembership";

class ProgrammesComponent extends React.PureComponent<any> {
  componentDidMount() {
    this.props.fetchPersonDetails();
  }

  render() {
    // const classes = useStyles();

    const personDetails = this.props.personReducer.personalDetails;
    const isLoaded = this.props.personReducer.isLoaded;
    const error = this.props.personReducer.error;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        personDetails.programmeMemberships && (
          <section>
            <Divider />
            <div>
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Programmes</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ width: "100%" }}>
                    {personDetails.programmeMemberships.length === 0 ? (
                      <div>You are not assigned to any programme</div>
                    ) : (
                      personDetails.programmeMemberships.map(
                        (
                          programmeMembership: ProgrammeMembership,
                          index: string | number | undefined
                        ) => (
                          <ProgrammePanel
                            key={index}
                            programmeMembership={programmeMembership}
                          />
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

export default connect(mapStateToProps, { fetchPersonDetails })(
  ProgrammesComponent
);
