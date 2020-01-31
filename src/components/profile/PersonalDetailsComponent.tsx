import React from "react";
import { PersonalDetails } from "../../models/PersonalDetails";
import styles from "./PersonalDetailsComponent.module.scss";

interface IProps {
  personalDetail: PersonalDetails | null;
}

const PersonalDetailsComponent = (props: IProps) => {

  const data = props.personalDetail;
  return (
    data && (
      <section>
        <h1 className={styles.name}>
          {data.title}. {data.forenames} {data.surname}
        </h1>

        <div className={styles.personalDetailContainer}>
          {data.maidenName && <div> Maiden Name: {data.maidenName}</div> }
          {data.knownAs && <div> Known As: {data.knownAs}</div> }     
          {data.gmcNumber && <div>GMC: {data.gmcNumber}</div> }
          {data.gmcStatus && <div>GMC Status: {data.gmcStatus}</div> }
          {data.gdcNumber && <div>GDC: {data.gdcNumber}</div> }
          {data.gdcStatus && <div>GDC Status: {data.gdcStatus}</div> }
          {data.publicHealthNumber && <div>PH: {data.publicHealthNumber}</div> }
          <div>Email: {data.email}</div>
          <div>T: {data.telephoneNumber}</div>
          {data.mobileNumber && <div> M: {data.mobileNumber}</div> }
          <div>{data.address1}</div>
          <div>
            {data.address2} {data.address3} {data.address4}
          </div>
          <div>{data.postCode}</div>
          
          {data.permitToWork && <div>Permit to Work: {data.permitToWork}</div> }
          {data.settled && <div>Settled: {data.settled}</div> }
          {data.visaIssued && <div>Visa Issued: {data.visaIssued}</div> }
          {data.detailsNumber && <div>Details/Number: {data.detailsNumber}</div> }
        </div>
      </section>
    )
  );
}

export default PersonalDetailsComponent;
