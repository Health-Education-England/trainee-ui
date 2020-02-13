import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PlacementPanel } from "./PlacementPanel";
import { Placement } from "../../models/Placement";

interface IPlacementsComponentProps {
  placements: Placement[];
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

const PlacementsComponent = (props: IPlacementsComponentProps) => {
  const classes = useStyles();
  const placements = props.placements;
  return (
    placements && (
      <section>
        <Divider />
        <div className={classes.root}>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Placements</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                {placements.length === 0 ? (
                  <div>You are not assigned to any placement</div>
                ) : (
                  placements.map((placement, index) => (
                    <PlacementPanel key={index} placement={placement} />
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

export default PlacementsComponent;
