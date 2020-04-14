import React from "react";
import { PersonalDetails } from "../../../models/PersonalDetails";
import styles from "./PersonalDetails.module.scss";
import { SummaryList } from "nhsuk-react-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { KeyValue } from "../../../models/KeyValue";

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

  if (!personalDetails) {
    return <div>Failed to laod data.</div>;
  }

  const fullName = `${personalDetails.title}. ${personalDetails.forenames} ${personalDetails.surname}`;

  const personalData: KeyValue[] = [
    { label: "Maiden name", value: personalDetails.maidenName },
    { label: "Known As", value: personalDetails.knownAs },
    { label: "Gender", value: personalDetails.gender },
    { label: "Date of birth", value: personalDetails.dateOfBirth },
    { label: "Email", value: personalDetails.email },
    { label: "Telephone", value: personalDetails.telephoneNumber },
    { label: "Mobile", value: personalDetails.mobileNumber }
  ];

  const sensitiveData: KeyValue[] = [
    { label: "GMC", value: personalDetails.gmcNumber },
    { label: "GDC", value: personalDetails.gdcNumber },
    { label: "PH", value: personalDetails.publicHealthNumber },
    { label: "GMC status", value: personalDetails.gmcStatus },
    { label: "GDC status", value: personalDetails.gdcStatus },
    { label: "Permit to Work", value: personalDetails.permitToWork },
    { label: "Settled", value: personalDetails.settled },
    { label: "Visa Issued", value: personalDetails.visaIssued },
    { label: "Details/Number", value: personalDetails.detailsNumber }
  ];
  return (
    <section className={classes.sectionPadding}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div id="traineeName" className={styles.name}>
            {fullName}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SummaryList>
            {personalData.map(pd => (
              <SummaryList.Row>
                <SummaryList.Key>{pd.label}</SummaryList.Key>
                <SummaryList.Value>{pd.value}</SummaryList.Value>
              </SummaryList.Row>
            ))}

            <SummaryList.Row>
              <SummaryList.Key>Address</SummaryList.Key>
              <SummaryList.Value>
                <p>{personalDetails.address1}</p>
                <p>{personalDetails.address2}</p>
                <p>
                  {personalDetails.address3}, {personalDetails.address4}
                </p>
                <p>{personalDetails.postCode}</p>
              </SummaryList.Value>
            </SummaryList.Row>
            <Typography className={classes.heading}>Sensitive data</Typography>
            {sensitiveData.map(
              sd =>
                sd.value && (
                  <SummaryList.Row>
                    <SummaryList.Key>{sd.label}</SummaryList.Key>
                    <SummaryList.Value>{sd.value}</SummaryList.Value>
                  </SummaryList.Row>
                )
            )}
          </SummaryList>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </section>
  );
};

export default PersonalDetailsComponent;
