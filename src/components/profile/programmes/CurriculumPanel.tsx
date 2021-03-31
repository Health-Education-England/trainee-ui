import React from "react";
import { Curriculum } from "../../../models/ProgrammeMembership";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface ICurriculumPanelProps {
  curriculum: Curriculum;
}

export const CurriculumPanel = (props: ICurriculumPanelProps) => {
  const curricData = props.curriculum;

  return (
    <div>
      <div>
        {curricData.curriculumName}
        {curricData.curriculumSubType
          ? `(${curricData.curriculumSubType})`
          : null}
      </div>
      <div>
        {DateUtilities.ToLocalDate(curricData.curriculumStartDate)} -{" "}
        {DateUtilities.ToLocalDate(curricData.curriculumEndDate)}
      </div>
      <hr className="nhsuk-u-padding-0 nhsuk-u-margin-bottom-1 nhsuk-u-margin-top-1" />
    </div>
  );
};
