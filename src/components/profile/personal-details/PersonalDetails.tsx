import React, { Fragment } from "react";
import { PersonalDetails } from "../../../models/PersonalDetails";
import styles from "./PersonalDetails.module.scss";
import { SummaryList } from "nhsuk-react-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  personalDetails: PersonalDetails | null;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightBold,
    margin: "5px 0"
  },
  sectionPadding: {
    padding: theme.typography.pxToRem(20)
  }
}));

const PersonalDetailsComponent: React.FC<IProps> = ({ personalDetails }) => {
  const classes = useStyles();
  return (
    personalDetails && (
      <Fragment>
        <section className={classes.sectionPadding}>
          <ExpansionPanel defaultExpanded={false}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div id="traineeName" className={styles.name}>
                {personalDetails.title}. {personalDetails.forenames}{" "}
                {personalDetails.surname}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SummaryList>
                <Typography className={classes.heading}>
                  Personal details
                </Typography>
                <SummaryList.Row>
                  <SummaryList.Key>Maiden name</SummaryList.Key>
                  <SummaryList.Value>
                    {personalDetails.maidenName}
                  </SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>Known As</SummaryList.Key>
                  <SummaryList.Value>
                    {personalDetails.knownAs}
                  </SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>Email</SummaryList.Key>
                  <SummaryList.Value>{personalDetails.email}</SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>Telephone</SummaryList.Key>
                  <SummaryList.Value>
                    {personalDetails.telephoneNumber}
                  </SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>Mobile</SummaryList.Key>
                  <SummaryList.Value>
                    {personalDetails.mobileNumber}
                  </SummaryList.Value>
                </SummaryList.Row>
                <SummaryList.Row>
                  <SummaryList.Key>Address</SummaryList.Key>
                  <SummaryList.Value>
                    <p>{personalDetails.address1}</p>
                    <p>{personalDetails.address2}</p>
                    <p>{personalDetails.address3}</p>
                    <p>
                      {personalDetails.address4} - {personalDetails.postCode}
                    </p>
                  </SummaryList.Value>
                </SummaryList.Row>
                <Typography className={classes.heading}>
                  Other sensitive data
                </Typography>
                {personalDetails.gmcNumber && (
                  <SummaryList.Row>
                    <SummaryList.Key>GMC</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.gmcNumber}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.gdcNumber && (
                  <SummaryList.Row>
                    <SummaryList.Key>GDC</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.gdcNumber}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.publicHealthNumber && (
                  <SummaryList.Row>
                    <SummaryList.Key>PH</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.publicHealthNumber}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.gmcStatus && (
                  <SummaryList.Row>
                    <SummaryList.Key>GMC status</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.gmcStatus}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.gdcStatus && (
                  <SummaryList.Row>
                    <SummaryList.Key>GDC status</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.gdcStatus}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.permitToWork && (
                  <SummaryList.Row>
                    <SummaryList.Key>Permit to Work</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.permitToWork}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.settled && (
                  <SummaryList.Row>
                    <SummaryList.Key>Settled</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.settled}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.visaIssued && (
                  <SummaryList.Row>
                    <SummaryList.Key>Visa Issued</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.visaIssued}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
                {personalDetails.detailsNumber && (
                  <SummaryList.Row>
                    <SummaryList.Key>Details/Number</SummaryList.Key>
                    <SummaryList.Value>
                      {personalDetails.detailsNumber}
                    </SummaryList.Value>
                  </SummaryList.Row>
                )}
              </SummaryList>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </section>
      </Fragment>
    )
  );
};

export default PersonalDetailsComponent;
