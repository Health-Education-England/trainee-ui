import React from "react";
import { Placement } from "../../../models/Placement";
import styles from "./Placements.module.scss";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface IPlacementPanelProps {
  placement: Placement;
}

export const PlacementPanel = (props: IPlacementPanelProps) => {
  const data = props.placement;
  return (
    <div id="placementContainer" className={styles.container}>
      <div>
        <b>{data.status.charAt(0) + data.status.slice(1).toLowerCase()}</b>
        <p>{data.site}</p>
      </div>

      <div className={styles.grid}>
        <div>
          <b>Starts: </b> <p>{DateUtilities.ToLocalDate(data.startDate)}</p>
        </div>
        <div className={styles.followingField}>
          <b>Ends: </b> <p>{DateUtilities.ToLocalDate(data.endDate)}</p>
        </div>
      </div>

      <div>
        <b>Specialty: </b> <p>{data.specialty}</p>
      </div>
    </div>
  );
};

export default PlacementPanel;
