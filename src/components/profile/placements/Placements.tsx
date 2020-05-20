import React from "react";
import { Details } from "nhsuk-react-components";
import { PlacementPanel } from "./PlacementPanel";
import { Placement } from "../../../models/Placement";

interface IPlacementProps {
  placements: Placement[];
}

const Placements: React.FC<IPlacementProps> = ({ placements }) => {
  return (
    placements && (
      <>
        <Details expander>
          <Details.Summary>Placements</Details.Summary>
          <Details.Text>
            {placements.length === 0 ? (
              <div>You are not assigned to any placement</div>
            ) : (
              placements.map(
                (placement: Placement, index: string | number | undefined) => (
                  <PlacementPanel key={index} placement={placement} />
                )
              )
            )}
          </Details.Text>
        </Details>
      </>
    )
  );
};

export default Placements;
