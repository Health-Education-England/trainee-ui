// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// cypress/support/index.js

Cypress.Commands.add(
  "checkFormRAValues",
  (dateAttained, completionDate, startDate, wholeTimeEquivalent) => {
    cy.get("#forename")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#surname")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#gmcNumber")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("[data-cy=localOfficeName]")
      .should("be.visible")
      .should("have.value", "Health Education England Wessex");
    cy.get("#dateOfBirth")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");

    cy.get("#gender").should("be.visible").should("have.value", "Male");
    //Test for 'Other' immigration status
    cy.get("#immigrationStatus")
      .should("be.visible")
      .select("Other")
      .should("have.value", "Other");
    cy.get("#otherImmigrationStatus")
      .should("be.visible")
      .should("have.value", "My special status");
    cy.get("#qualification")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#dateAttained")
      .should("be.visible")
      .should("have.value", dateAttained);
    cy.get("#medicalSchool")
      .should("be.visible")
      .should("have.value", "University of Medical Things");
    cy.get("#address1")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#address2")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#address3")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#address4")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#postCode")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#telephoneNumber")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    cy.get("#mobileNumber")
      .should("be.visible")
      .should("have.value", "0777777777777");
    cy.get("#email")
      .should("be.visible")
      .should("have.value", "traineeui.tester@hee.nhs.uk");

    cy.get("[data-cy=radio-0]").should("be.checked");

    cy.get("#programmeSpecialty")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#cctSpecialty1")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#cctSpecialty2")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#college")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#completionDate")
      .should("be.visible")
      .should("have.value", completionDate);

    cy.get("#trainingGrade")
      .should("be.visible")
      .should("not.have.value", "--Please select--");

    cy.get("#startDate").should("be.visible").should("have.value", startDate);
    cy.get("#programmeMembershipType")
      .should("be.visible")
      .should("have.value", "LAT");

    cy.get("#wholeTimeEquivalent")
      .should("be.visible")
      .should("have.value", wholeTimeEquivalent);
  }
);

Cypress.Commands.add("checkAndFillSection1", (currRevalDate, prevRevalDate) => {
  cy.contains("Section 1: Doctor's details").should("be.visible");
  cy.get("[data-cy=mainWarning1]").should("be.visible");
  cy.get("[data-cy=legendFieldset1]").should("be.visible");
  cy.get(".nhsuk-warning-callout > p").should("be.visible");
  cy.get("#forename").should("be.visible").invoke("val").should("not.be.empty");
  cy.get("#surname").should("be.visible").invoke("val").should("not.be.empty");
  cy.get("#gmcNumber")
    .should("be.visible")
    .invoke("val")
    .should("not.be.empty");

  cy.get("#gmcNumber").focus();
  cy.get("#gmcNumber").clear();
  cy.get("#gmcNumber").type("11111111");

  cy.get("#email").should("be.visible");
  cy.get("#email").clear().type("traineeui.tester@hee.nhs.uk");

  cy.get("[data-cy='localOfficeName']")
    .should("be.visible")
    .focus()
    .select("Health Education England Wessex");
  cy.get("#prevRevalBody > option")
    .eq(1)
    .then(element => {
      const selectedItem = element.val().toString();
      cy.get("#prevRevalBody")
        .select(selectedItem)
        .should("not.have.value", "--Please select--");
    });
  cy.get("#currRevalDate").should("be.visible").clear().type(currRevalDate);
  cy.get("#prevRevalDate").should("be.visible").clear().type(prevRevalDate);
  cy.get("#programmeSpecialty > option")
    .eq(1)
    .then(element => {
      const selectedItem = element.val().toString();
      cy.get("#programmeSpecialty")
        .select(selectedItem)
        .should("not.have.value", "--Please select--");
    });
  cy.get("#dualSpecialty > option")
    .eq(1)
    .then(element => {
      const selectedItem = element.val().toString();
      cy.get("#dualSpecialty")
        .select(selectedItem)
        .should("not.have.value", "--Please select--");
    });
});

Cypress.Commands.add("checkAndFillSection2", workStartDate => {
  // This command fills the section with default work panel only

  cy.contains("Whole Scope of Practice").should("be.visible");
  cy.get(".nhsuk-warning-callout > p").should("be.visible");
  cy.contains("Type of work").should("be.visible");
  cy.contains("Add more").should("be.visible");
  cy.contains("TOOT").should("be.visible");

  // Delete all other work panels except default work panel
  Cypress.$('[data-jest="removePanel"]').each(() =>
    cy.get('[data-cy="closeIcon1"]').click()
  );

  cy.get('[data-cy="work[0].trainingPost"]').select("Yes");
  cy.get('[data-cy="work[0].typeOfWork"]')
    .should("be.visible")
    .clear()
    .type("In Post Doing Something");
  cy.get('[data-cy="work[0].startDate"]')
    .should("be.visible")
    .clear()
    .type(workStartDate);

  cy.get("#sicknessAbsence").should("be.visible").clear().type("1");
  cy.get("#paidLeave").should("be.visible").clear().type("2");
  cy.get("#parentalLeave").should("be.visible").clear().type("3");
  cy.get("#careerBreaks").should("be.visible").clear().type("4");
  cy.get("#unauthorisedLeave").should("be.visible").clear().type("5");
  cy.get("#otherLeave").should("be.visible").clear().type("6");
  cy.get("#totalLeave").should("have.value", "21");

  cy.get("[data-cy=BtnAddWorkType]").should("be.visible");
});

Cypress.Commands.add("checkAndFillSection3", () => {
  cy.get("[data-cy=legendFieldset3]").should("include.text", "Section 3");
  cy.get("[data-cy=mainWarning3]").should("be.visible");
  cy.get("[data-cy=declarations]").should("be.visible");
  cy.get("[data-cy=healthStatement]").should("be.visible");

  cy.get("[data-cy=isHonest0]")
    .should("be.visible")
    .should("contain.value", "")
    .click();
  cy.get("[data-cy=isHealthy0]")
    .should("be.visible")
    .should("contain.value", "")
    .click();
  cy.get("[data-cy=isWarned0]")
    .should("be.visible")
    .should("contain.value", "")
    .click();
  cy.get("[data-cy=isComplying0]").should("be.visible").click();
  cy.get(".nhsuk-form-group > [data-cy=healthStatement]")
    .should("be.visible")
    .type("I'm in astonishingly excellent health.");
});

Cypress.Commands.add("checkAndFillSection4", pastDate => {
  cy.get("[data-cy=legendFieldset4]").should("include.text", "Section 4");
  cy.get("[data-cy=mainWarning4]").should("be.visible");
  cy.get("[data-cy=declarations4]").should("be.visible");

  cy.get("[data-cy=havePreviousDeclarations1]")
    .should("be.visible")
    .should("contain.value", "")
    .click();

  cy.get("#declarationPanel0").should("not.be.visible");

  cy.get("[data-cy=havePreviousDeclarations0]")
    .should("be.visible")
    .should("contain.value", "")
    .click();

  // Fill declaration
  cy.get("#declarationPanel0").should("be.visible");

  cy.get('[data-cy="previousDeclarations[0].declarationType"]')
    .should("be.visible")
    .select("Complaint");

  cy.get('[data-cy="previousDeclarations[0].dateOfEntry"]')
    .should("be.visible")
    .type(pastDate);

  cy.get('[data-cy="previousDeclarations[0].title"]')
    .should("be.visible")
    .type("declaration title");

  cy.get('[data-cy="previousDeclarations[0].locationOfEntry"]')
    .should("be.visible")
    .type("declaration location");
});

Cypress.Commands.add("checkAndFillSection5", pastDate => {
  cy.get("[data-cy=legendFieldset5]").should("include.text", "Section 5");
  cy.get("[data-cy=mainWarning5]").should("be.visible");
  cy.get("[data-cy=declarations5]").should("be.visible");

  cy.get("[data-cy=haveCurrentDeclarations1]")
    .should("be.visible")
    .should("contain.value", "")
    .click();

  cy.get("#declarationPanel0").should("not.be.visible");

  cy.get("[data-cy=haveCurrentDeclarations0]")
    .should("be.visible")
    .should("contain.value", "")
    .click();

  // Fill declaration
  cy.get("#declarationPanel0").should("be.visible");

  cy.get('[data-cy="currentDeclarations[0].declarationType"]')
    .should("be.visible")
    .select("Complaint");

  cy.get('[data-cy="currentDeclarations[0].dateOfEntry"]')
    .should("be.visible")
    .type(pastDate);

  cy.get('[data-cy="currentDeclarations[0].title"]')
    .should("be.visible")
    .type("declaration title");

  cy.get('[data-cy="currentDeclarations[0].locationOfEntry"]')
    .should("be.visible")
    .type("declaration location");
});

Cypress.Commands.add("checkAndFillSection6", compliments => {
  cy.get("[data-cy=legendFieldset6]").should("include.text", "Section 6");

  cy.get("[data-cy=compliments]")
    .should("be.visible")
    .should("contain.value", "");
  cy.get("[data-cy=compliments]").type(compliments);
});

Cypress.Commands.add("addWorkPanel", (startDate, endDate) => {
  cy.get("[data-cy=BtnAddWorkType]").click();

  const workPanels = Cypress.$(".nhsuk-panel").length;

  cy.get(`[data-cy="work[${workPanels}].typeOfWork"]`)
    .should("be.visible")
    .type("Work");
  cy.get(`[data-cy="work[${workPanels}].trainingPost"]`)
    .should("be.visible")
    .select("No");
  cy.get(`[data-cy="work[${workPanels}].startDate"]`)
    .should("be.visible")
    .type(startDate);
  cy.get(`[data-cy="work[${workPanels}].endDate"]`)
    .should("be.visible")
    .type(endDate);
  cy.get(`[data-cy="work[${workPanels}].site"]`)
    .should("be.visible")
    .type("Site");
  cy.get(`[data-cy="work[${workPanels}].siteLocation"]`)
    .should("be.visible")
    .type("Location");
});
