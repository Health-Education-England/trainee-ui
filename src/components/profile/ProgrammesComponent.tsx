import React from "react";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProgrammeMembership } from "../../models/PersonalDetails";


interface IProgrammePanelProps {
  programmeMembership: ProgrammeMembership;
}

const ProgrammePanel = (props: IProgrammePanelProps) => {
  const data = props.programmeMembership;
  return (
    <div>
      <div>Number: {data.programmeNumber}</div>
      <div>Name: {data.programmeName}</div>
      <div>Owner: {data.managingDeanery}</div>
    </div>
  );
}

interface IProps {
  programmeMemberships: ProgrammeMembership[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ProgrammesComponent = (props: IProps) => {
  const classes = useStyles();
  const programmeMemberships = props.programmeMemberships;
  return (
    programmeMemberships &&
    <div>
      <Divider/>
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{display: 'flex', justifyContent:'space-between'}}
          >
            <Typography className={classes.heading}>Programmes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {programmeMemberships.map(programmeMembership => 
              <ProgrammePanel programmeMembership={programmeMembership}/>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};

export default ProgrammesComponent;
