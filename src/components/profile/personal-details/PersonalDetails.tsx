import React from "react";
import { PersonalDetails } from "../../../models/PersonalDetails";
import styles from "./PersonalDetails.module.scss";
import { SummaryList } from "nhsuk-react-components";

interface IProps {
  personalDetail: PersonalDetails | null;
}

const PersonalDetailsComponent = (props: IProps) => {
  const data = props.personalDetail;
  return (
    data && (
      <div className="nhsuk-width-container">
        <h1 id="traineeName" className={styles.name}>
          {data.title}. {data.forenames} {data.surname}
        </h1>
        <br></br>
        <SummaryList>
          <SummaryList.Row>
            <SummaryList.Key>Mainden name</SummaryList.Key>
            <SummaryList.Value>{data.maidenName}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Known As</SummaryList.Key>
            <SummaryList.Value>{data.knownAs}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Email</SummaryList.Key>
            <SummaryList.Value>{data.email}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Telephone</SummaryList.Key>
            <SummaryList.Value>{data.telephoneNumber}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Mobile</SummaryList.Key>
            <SummaryList.Value>{data.mobileNumber}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Address</SummaryList.Key>
            <SummaryList.Value>
              <p>{data.address1}</p>
              <p>{data.address2}</p>
              <p>{data.address3}</p>
              <p>
                {data.address4} - {data.postCode}
              </p>
            </SummaryList.Value>
          </SummaryList.Row>
        </SummaryList>
        <h3>Sensitive data</h3>
        <SummaryList>
          {data.gmcNumber && (
            <SummaryList.Row>
              <SummaryList.Key>GMC</SummaryList.Key>
              <SummaryList.Value>{data.gmcNumber}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.gdcNumber && (
            <SummaryList.Row>
              <SummaryList.Key>GDC</SummaryList.Key>
              <SummaryList.Value>{data.gdcNumber}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.publicHealthNumber && (
            <SummaryList.Row>
              <SummaryList.Key>PH</SummaryList.Key>
              <SummaryList.Value>{data.publicHealthNumber}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.gmcStatus && (
            <SummaryList.Row>
              <SummaryList.Key>GMC status</SummaryList.Key>
              <SummaryList.Value>{data.gmcStatus}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.gdcStatus && (
            <SummaryList.Row>
              <SummaryList.Key>GDC status</SummaryList.Key>
              <SummaryList.Value>{data.gdcStatus}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.permitToWork && (
            <SummaryList.Row>
              <SummaryList.Key>Permit to Work</SummaryList.Key>
              <SummaryList.Value>{data.permitToWork}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.settled && (
            <SummaryList.Row>
              <SummaryList.Key>Settled</SummaryList.Key>
              <SummaryList.Value>{data.settled}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.visaIssued && (
            <SummaryList.Row>
              <SummaryList.Key>Visa Issued</SummaryList.Key>
              <SummaryList.Value>{data.visaIssued}</SummaryList.Value>
            </SummaryList.Row>
          )}
          {data.detailsNumber && (
            <SummaryList.Row>
              <SummaryList.Key>Details/Number</SummaryList.Key>
              <SummaryList.Value>{data.detailsNumber}</SummaryList.Value>
            </SummaryList.Row>
          )}
        </SummaryList>
      </div>
    )
  );
};

export default PersonalDetailsComponent;
