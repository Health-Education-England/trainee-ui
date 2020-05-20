import React from "react";
import { BackLink, SummaryList, Panel } from "nhsuk-react-components";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { FormRPartB } from "../../../models/FormRPartB";
import { DateUtilities } from "../../../utilities/DateUtilities";
import classes from "./FormRPartB.module.scss";

interface ViewProps {
  formData: FormRPartB | null;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartBView.formData
});

class View extends React.PureComponent<ViewProps> {
  render() {
    const { formData, history } = this.props;

    if (!formData) {
      history.push("/formr-b");
      return null;
    }

    return (
      formData && (
        <>
          <BackLink href="/formr-b">Go back to list</BackLink>
          <h2>Section 1: Doctor's details</h2>
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

          <h2>Section 2: Whole Scope of Practice</h2>
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

export default connect(mapStateToProps)(View);
