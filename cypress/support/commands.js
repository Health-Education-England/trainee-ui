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
