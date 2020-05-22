import React from "react";
import { Placement } from "../../../models/Placement";
import { SummaryList } from "nhsuk-react-components";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface IPlacementPanelProps {
  placement: Placement;
}

export const PlacementPanel = (props: IPlacementPanelProps) => {
  const data = props.placement;

  return (
    <SummaryList>
      <SummaryList.Row>
        <SummaryList.Key>Site</SummaryList.Key>
        <SummaryList.Value>{data.site}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Starts</span>
        </SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.startDate)}
        </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Ends</SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.endDate)}
        </SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Specialty</span>
        </SummaryList.Key>
        <SummaryList.Value>{data.specialty}</SummaryList.Value>
      </SummaryList.Row>
    </SummaryList>
  );
};

export default PlacementPanel;
