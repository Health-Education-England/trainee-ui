import React from "react";
import { RootState } from "../../../redux/reducers";
import { GenericOwnProps } from "../../../redux/types";
import { connect, ConnectedProps } from "react-redux";
import {
  loadFormRPartBInitialValues,
  loadFormRPartB,
  moveToSection
} from "../../../redux/actions/formr-partb-actions";
import { loadReferenceData } from "../../../redux/actions/reference-data-actions";
import { TraineeProfileService } from "../../../services/TraineeProfileService";
import { TraineeReferenceService } from "../../../services/TraineeReferenceService";
import Loading from "../../common/Loading";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import { FormRPartB } from "../../../models/FormRPartB";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  formData: state.newFormRPartB.formData,
  localOffices: state.referenceData.localOffices,
  curricula: state.referenceData.curricula,
  isLoaded: state.referenceData.isLoaded,
  section: state.newFormRPartB.section,
  history: ownProps.history,
  location: ownProps.location
});

const mapDispatchProps = {
  loadFormRPartBInitialValues,
  loadReferenceData,
  loadFormRPartB,
  moveToSection
};

const connector = connect(mapStateToProps, mapDispatchProps);

class Create extends React.PureComponent<ConnectedProps<typeof connector>> {
  componentDidMount() {
    this.props.loadFormRPartBInitialValues(new TraineeProfileService());
    this.props.loadReferenceData(new TraineeReferenceService());
  }

  nextSection = (formData: FormRPartB) => {
    this.props.moveToSection(formData, this.props.section + 1);
  };

  previousSection = (formData: FormRPartB) => {
    this.props.moveToSection(formData, this.props.section - 1);
  };

  submitForm = (formData: FormRPartB) => {
    this.props.loadFormRPartB(formData);
  };

  render() {
    const { formData, localOffices, curricula, isLoaded, section } = this.props;

    if (!isLoaded || !formData) {
      return <Loading data-jest="loading" />;
    } else {
      if (localOffices.length > 0) {
        if (!localOffices.some(l => l.label === formData.localOfficeName)) {
          formData.localOfficeName = "";
        }

        if (!localOffices.some(l => l.label === formData.prevRevalBody)) {
          formData.prevRevalBody = "";
        }
      }

      if (
        curricula.length > 0 &&
        !curricula.some(l => l.label === formData.programmeSpecialty)
      ) {
        formData.programmeSpecialty = "";
      }

      switch (section) {
        case 1:
          return (
            <Section1
              localOffices={localOffices}
              curricula={curricula}
              formData={formData}
              nextSection={this.nextSection}
            ></Section1>
          );
        case 2:
          return (
            <Section2
              formData={formData}
              previousSection={this.previousSection}
              nextSection={this.nextSection}
              history={this.props.history}
            ></Section2>
          );
        case 3:
          return (
            <Section3
              previousSection={this.previousSection}
              nextSection={this.submitForm}
              formData={formData}
              history={this.props.history}
            ></Section3>
          );

        default:
          return <Loading data-jest="loading" />;
      }
    }
  }
}

export default connector(Create);
