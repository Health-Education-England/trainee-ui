import React from "react";
import { ProgrammeMembership } from "../../models/ProgrammeMembership";
import styles from "./Programmes.module.scss";

interface IProgrammePanelProps {
  programmeMembership: ProgrammeMembership;
}

export const ProgrammePanel = (props: IProgrammePanelProps) => {
  const data = props.programmeMembership;
  return (
    <div id="programmeContainer" className={styles.container}>
      <div className={styles.grid}>
        <div>
          <b>Number:</b>
          <p>{data.programmeNumber}</p>
        </div>
        <div className={styles.followingField}>
          <b>Status: </b>
          <p>{data.status.charAt(0) + data.status.slice(1).toLowerCase()}</p>
        </div>
      </div>

      <div>
        <b>Name: </b> <p>{data.programmeName}</p>
      </div>
      <div>
        <b>Owner: </b> <p>{data.managingDeanery}</p>
      </div>
      <div>
        <b>Curricula:</b>{" "}
        {data.curricula.length === 0
          ? "N/A"
          : data.curricula.map(c => <span>{c.curriculumName}</span>)}
      </div>
    </div>
  );
};

export default ProgrammePanel;
