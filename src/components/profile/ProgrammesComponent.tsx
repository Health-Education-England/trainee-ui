import React from "react";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProgrammeMembership } from "../../models/PersonalDetails";
import styles from "./Programmes.module.scss";

interface IProgrammePanelProps {
  programmeMembership: ProgrammeMembership;
}

const ProgrammePanel = (props: IProgrammePanelProps) => {
  const data = props.programmeMembership;
  return (
    <div className = {styles.programmeContainer}>
      <div className = {styles.grid}>
        <div>
          <b>Number:</b><p>{data.programmeNumber}</p>
        </div>
        <div className = {styles.statusField}>
          <b>Status: </b><p>{data.status.charAt(0) + data.status.slice(1).toLowerCase()}</p>
        </div>
      </div>

      <div>
        <b>Name: </b> <p>{data.programmeName}</p>
      </div>
      <div>
        <b>Owner: </b> <p>{data.managingDeanery}</p>
      </div>
      <div><b>Curricula:</b> {data.curricula.length === 0? 
        'N/A' : 
        data.curricula.map(c => <span>{c.curriculumName}</span>)} </div>
    </div>
  );
}

interface IProgrammesComponentProps {
  programmeMemberships: ProgrammeMembership[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    margin: '0px',
  },
}));

const ProgrammesComponent = (props: IProgrammesComponentProps) => {
  const classes = useStyles();
  const programmeMemberships = props.programmeMemberships;
  return (
    programmeMemberships &&
    <section>
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
              {programmeMemberships.length === 0? <div>You are not assigned to any programme</div>: programmeMemberships
              .map((programmeMembership, index) => 
                <ProgrammePanel key={index} programmeMembership={programmeMembership}/>
              )}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </section>
  );
};

export default ProgrammesComponent;
