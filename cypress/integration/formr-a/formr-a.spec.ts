/// <reference types="cypress" />

const todaysDate = Cypress.moment().format("YYYY-MM-DD");

const dateAttained = Cypress.moment(todaysDate)
  .subtract({ years: 1, months: 6, days: 12 })
  .format("YYYY-MM-DD");

const completionDate = Cypress.moment(todaysDate)
  .add(6, "M")
  .format("YYYY-MM-DD");

const startDate = Cypress.moment(todaysDate)
  .subtract({ months: 9, days: 30 })
  .format("YYYY-MM-DD");

describe("Form R (Part A)", () => {
  it("Should complete a new Form R Part A.", () => {
    cy.contains("Menu").click();
    cy.contains("Form R-a").click();

    cy.contains("Submit")
      .should("be.visible")
      .click();
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-a");
    //-- personal details section --
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
    cy.get("#localOfficeName > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#localOfficeName")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#dateOfBirth")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
    //TODO need to test date picker too
    cy.get("#gender")
      .should("be.visible")
      .should("have.value", "Male");
    //Test for 'Other' immigration status
    cy.get("#immigrationStatus")
      .should("be.visible")
      .select("Other")
      .should("have.value", "Other");
    cy.get("#otherImmigrationStatus")
      .should("be.visible")
      .type("My special status")
      .should("have.value", "My special status");
    cy.get("#qualification > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#qualification")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#dateAttained")
      .should("be.visible")
      .clear()
      .type(dateAttained);
    cy.get("#medicalSchool")
      .should("be.visible")
      .clear()
      .type("University of Medical Things");
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
      .clear()
      .type("0777777777777");
    // Leave email blank intentionally to check for inline error message
    cy.get("#email")
      .focus()
      .should("be.visible")
      .should("not.contain.text");
    cy.get("#mobileNumber").focus();
    cy.get("#email")
      .should("be.visible")
      .type("traineeui.tester@hee.nhs.uk");

    //-- Declarations section --
    cy.get("#cctSpecialty1").should("not.be.visible");
    cy.get("#cctSpecialty2").should("not.be.visible");
    cy.get('div[data-cy="radio-0"] > [data-cy=radio-0]').click();
    cy.get("#cctSpecialty1").should("be.visible");
    cy.get("#cctSpecialty2").should("be.visible");

    //- Programme specialty section --
    cy.get("#programmeSpecialty > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#programmeSpecialty")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#cctSpecialty1 > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#cctSpecialty1")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#cctSpecialty2 > option")
      .eq(2)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#cctSpecialty2")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#college > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#college")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });

    cy.get("#completionDate").type(completionDate);

    //- Programme section --
    cy.get("#trainingGrade > option")
      .eq(3)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#trainingGrade")
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
    cy.get("#startDate")
      .type(startDate)
      .should("not.have.value", "");
    cy.get("#programmeMembershipType")
      .should("be.visible")
      .clear()
      .type("LAT");
    //-- error msg when FTE not completed
    cy.get("form > .nhsuk-button").click();
    cy.get(".nhsuk-error-summary").should("be.visible");
    cy.get("#wholeTimeEquivalent--error-message").should("be.visible");
    cy.get("#wholeTimeEquivalent").type("0.99");

    //submitting / editing the form
    cy.contains("Continue").click();
    cy.get(".nhsuk-warning-callout").should("be.visible");

    cy.contains("Submit").should("be.visible");
    cy.contains("Edit")
      .should("be.visible")
      .click();
    //TODO could do a cypress visual test of form here to check contents have remained the same
    cy.contains("Submit").should("not.be.visible");
    cy.contains("Edit").should("not.be.visible");
    cy.contains("Continue").should("be.visible");
    cy.get("#wholeTimeEquivalent")
      .clear()
      .type("1")
      .should("have.value", "1");
    cy.contains("Continue").click();
    cy.get(
      ":nth-child(2) > .nhsuk-summary-list > :nth-child(1) > .nhsuk-summary-list__key"
    )
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Submit")
      .scrollIntoView()
      .should("be.visible")
      .click();

    //--Go to list of submitted/ saved forms (Form Part A)
    cy.contains("Submitted forms").should("be.visible");
    cy.get(
      ":nth-child(1) > td > .nhsuk-action-link > .nhsuk-action-link__link > .nhsuk-action-link__text"
    )
      .should("be.visible")
      .click();
    cy.contains("Personal Details").should("be.visible");
    cy.get(".nhsuk-back-link__link")
      .should("be.visible")
      .click();
    cy.contains("Submitted forms").should("be.visible");
  });
});
