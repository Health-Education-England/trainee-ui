import React from "react";
import { BackLink, SummaryList, Panel, Button } from "nhsuk-react-components";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { FormRPartB } from "../../../models/FormRPartB";
import { DateUtilities } from "../../../utilities/DateUtilities";
import classes from "./FormRPartB.module.scss";
import { moveToSection } from "../../../redux/actions/formr-partb-actions";

interface ViewProps {
  formData: FormRPartB | null;
  moveToSection: (formData: FormRPartB, section?: number) => any;
  canEdit: boolean;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartBView.formData
});

const mapDispatchToProps = {
  moveToSection
};

class View extends React.PureComponent<ViewProps> {
  render() {
    const { formData, history, moveToSection, canEdit } = this.props;

    if (!formData) {
      history.push("/formr-b");
      return null;
    }

    const SectionEditButton = (section: number) => {
      return canEdit ? (
        <Button
          type="button"
          className={classes.sectionEditButton}
          onClick={() => {
            moveToSection(formData, section);
            history.push("/formr-b/create");
          }}
        >
          Edit
        </Button>
      ) : null;
    };

    return (
      formData && (
        <>
          <BackLink href="/formr-b">Go back to list</BackLink>
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h2>Section 1: Doctor's details</h2>
            </div>
            <div className="nhsuk-grid-column-one-third">
              {SectionEditButton(1)}
            </div>
          </div>

          <Panel label="Personal details">
            <SummaryList>
              <SummaryList.Row>
                <SummaryList.Key>Forename(s)</SummaryList.Key>
                <SummaryList.Value>{formData.forename}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Surname (GMC-Registered)</SummaryList.Key>
                <SummaryList.Value>{formData.surname}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>GMC Number</SummaryList.Key>
                <SummaryList.Value>{formData.gmcNumber}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Email</SummaryList.Key>
                <SummaryList.Value>{formData.email}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Current Deanery / HEE Local team
                </SummaryList.Key>
                <SummaryList.Value>
                  {formData.localOfficeName}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Previous Designated Revalidation Body
                </SummaryList.Key>
                <SummaryList.Value>{formData.prevRevalBody}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Current Revalidation Date</SummaryList.Key>
                <SummaryList.Value>
                  {DateUtilities.ToLocalDate(formData.currRevalDate || null)}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Previous Revalidation Date</SummaryList.Key>
                <SummaryList.Value>
                  {DateUtilities.ToLocalDate(formData.prevRevalDate || null)}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Programme / Training Specialty
                </SummaryList.Key>
                <SummaryList.Value>
                  {formData.programmeSpecialty}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Dual Specialty</SummaryList.Key>
                <SummaryList.Value>{formData.dualSpecialty}</SummaryList.Value>
              </SummaryList.Row>
            </SummaryList>
          </Panel>

          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h2>Section 2: Whole Scope of Practice</h2>
            </div>
            <div className="nhsuk-grid-column-one-third">
              {SectionEditButton(2)}
            </div>
          </div>

          <Panel label="Type of work">
            {formData.work
              ? formData.work.map((w, i) => (
                  <Panel key={i} className={classes.workPanel}>
                    <h3>Type of work {i + 1}</h3>
                    <SummaryList>
                      <SummaryList.Row>
                        <SummaryList.Key>Type of Work</SummaryList.Key>
                        <SummaryList.Value>{w.typeOfWork}</SummaryList.Value>
                      </SummaryList.Row>
                      <SummaryList.Row>
                        <SummaryList.Key>Training post</SummaryList.Key>
                        <SummaryList.Value>{w.trainingPost}</SummaryList.Value>
                      </SummaryList.Row>
                      <SummaryList.Row>
                        <SummaryList.Key>Start Date</SummaryList.Key>
                        <SummaryList.Value>
                          {DateUtilities.ToLocalDate(w.startDate || null)}
                        </SummaryList.Value>
                      </SummaryList.Row>
                      <SummaryList.Row>
                        <SummaryList.Key>End Date</SummaryList.Key>
                        <SummaryList.Value>
                          {DateUtilities.ToLocalDate(w.endDate || null)}
                        </SummaryList.Value>
                      </SummaryList.Row>
                      <SummaryList.Row>
                        <SummaryList.Key>Site Name</SummaryList.Key>
                        <SummaryList.Value>{w.site}</SummaryList.Value>
                      </SummaryList.Row>
                      <SummaryList.Row>
                        <SummaryList.Key>Site Location</SummaryList.Key>
                        <SummaryList.Value>{w.siteLocation}</SummaryList.Value>
                      </SummaryList.Row>
                    </SummaryList>
                  </Panel>
                ))
              : null}
          </Panel>
          <Panel label="Reasons for TIME OUT OF TRAINING (‘TOOT’)">
            <SummaryList>
              <SummaryList.Row>
                <SummaryList.Key>
                  Short and Long-term sickness absence
                </SummaryList.Key>
                <SummaryList.Value>
                  {formData.sicknessAbsence}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Parental leave (incl Maternity / Paternity leave)
                </SummaryList.Key>
                <SummaryList.Value>{formData.parentalLeave}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Career breaks within a Programme (OOPC) and non-training
                  placements for experience (OOPE)
                </SummaryList.Key>
                <SummaryList.Value>{formData.careerBreaks}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Paid / unpaid leave (e.g. compassionate, jury service)
                </SummaryList.Key>
                <SummaryList.Value>{formData.paidLeave}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  Unpaid/unauthorised leave including industrial action
                </SummaryList.Key>
                <SummaryList.Value>
                  {formData.unauthorisedLeave}
                </SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>Other</SummaryList.Key>
                <SummaryList.Value>{formData.otherLeave}</SummaryList.Value>
              </SummaryList.Row>
              <SummaryList.Row>
                <SummaryList.Key>
                  <b>Total</b>
                </SummaryList.Key>
                <SummaryList.Key>
                  <b>{formData.totalLeave}</b>
                </SummaryList.Key>
              </SummaryList.Row>
            </SummaryList>
          </Panel>
        </>
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
