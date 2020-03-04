import React from "react";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PlacementPanel } from "./PlacementPanel";
import { Placement } from "../../../models/Placement";
import { makeStyles } from "@material-ui/core/styles";

interface IPlacementsComponentProps {
  placements: Placement[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightBold,
    margin: "0px"
  },
  sectionPadding: {
    padding: theme.typography.pxToRem(20)
  }
}));

const PlacementsComponent: React.FC<IPlacementsComponentProps> = ({
  placements
}) => {
  const classes = useStyles();
  return (
    placements && (
      <section className={classes.sectionPadding}>
        <Divider />
        <div>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Placements</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.root}>
                {placements.length === 0 ? (
                  <div>You are not assigned to any placement</div>
                ) : (
                  placements.map(
                    (
                      placement: Placement,
                      index: string | number | undefined
                    ) => <PlacementPanel key={index} placement={placement} />
                  )
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
