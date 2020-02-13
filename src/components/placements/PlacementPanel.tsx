import React from "react";
import { Placement } from "../../models/Placement";
import styles from "./Placements.module.scss";

interface IPlacementPanelProps {
  placement: Placement;
}

export const PlacementPanel = (props: IPlacementPanelProps) => {
  const data = props.placement;
  return (
    <div className={styles.container}>
      <div>
        <b>{data.status.charAt(0) + data.status.slice(1).toLowerCase()}</b>
        <p>{data.site}</p>
      </div>

      <div className={styles.grid}>
        <div>
          <b>Starts: </b> <p>{data.startDate}</p>
        </div>
        <div className={styles.followingField}>
          <b>Ends: </b> <p>{data.endDate}</p>
        </div>
      </div>

      <div>
        <b>Specialty: </b> <p>{data.specialty}</p>
      </div>
    </div>
  );
};

export default PlacementPanel;
