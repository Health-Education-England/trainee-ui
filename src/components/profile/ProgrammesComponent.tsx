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
    <div style={{border: '1px solid #B5B5B5', marginBottom: '10px'}}>
      <div>Number: {data.programmeNumber}</div>
      <div>Name: {data.programmeName}</div>
      <div>Owner: {data.managingDeanery}</div>
      <div>Curricula: {data.curricula.length === 0? 
        'N/A' : 
        data.curricula.map(c => <span>{c.curriculumName}</span>)} </div>
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
  const filteredProgrammeMemberships = programmeMemberships
    .filter(programmeMembership => 
      programmeMembership.status === 'Future' || programmeMembership.status === 'Current');
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
          >
            <Typography className={classes.heading}>Programmes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: '100%'}}>
              {filteredProgrammeMemberships.length === 0? <div>You are not assigned to any current or future programme</div>: filteredProgrammeMemberships
              .map(programmeMembership => 
                <ProgrammePanel programmeMembership={programmeMembership}/>
              )}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};

export default ProgrammesComponent;
