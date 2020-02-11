import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProgrammePanel } from "./ProgrammePanel";
import { ProgrammeMembership } from "../../models/ProgrammeMembership";

interface IProgrammesComponentProps {
  programmeMemberships: ProgrammeMembership[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    margin: "0px"
  }
}));

const ProgrammesComponent = (props: IProgrammesComponentProps) => {
  const classes = useStyles();
  const programmeMemberships = props.programmeMemberships;
  return (
    programmeMemberships && (
      <section>
        <Divider />
        <div className={classes.root}>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Programmes</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                {programmeMemberships.length === 0 ? (
                  <div>You are not assigned to any programme</div>
                ) : (
                  programmeMemberships.map((programmeMembership, index) => (
                    <ProgrammePanel
                      key={index}
                      programmeMembership={programmeMembership}
                    />
                  ))
                )}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </section>
    )
  );
};

export default ProgrammesComponent;
