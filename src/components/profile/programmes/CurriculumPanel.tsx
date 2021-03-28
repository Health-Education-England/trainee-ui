import React from "react";
import { Curriculum } from "../../../models/ProgrammeMembership";
import { Details, SummaryList } from "nhsuk-react-components";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface ICurriculumPanelProps {
  curriculum: Curriculum;
}

export const CurriculumPanel = (props: ICurriculumPanelProps) => {
  const curricData = props.curriculum;

  return (
    <Details expander>
      <Details.Summary>{curricData.curriculumName}</Details.Summary>
      <Details.Text>
        <SummaryList>
          <SummaryList.Row>
            <SummaryList.Key>Name</SummaryList.Key>
            <SummaryList.Value>{curricData.curriculumName}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Sub Type</SummaryList.Key>
            <SummaryList.Value>
              {curricData.curriculumSubType}
            </SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Start Date</SummaryList.Key>
            <SummaryList.Value>
              {DateUtilities.ToLocalDate(curricData.curriculumStartDate)}
            </SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>End Date</SummaryList.Key>
            <SummaryList.Value>
              {DateUtilities.ToLocalDate(curricData.curriculumEndDate)}
            </SummaryList.Value>
          </SummaryList.Row>
        </SummaryList>
      </Details.Text>
    </Details>
  );
};
