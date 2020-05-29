/// <reference types="cypress" />

let currentDate = Cypress.moment().format("YYYY-MM-DD");

const currRevalDate = Cypress.moment(currentDate)
  .add(3, "M")
  .format("YYYY-MM-DD");

const prevRevalDate = Cypress.moment(currentDate)
  .subtract({ years: 5 })
  .format("YYYY-MM-DD");

describe("Form R (Part B)", () => {
  it("Should complete a new Form R Part B.", () => {
    cy.contains("Menu").click();
    cy.contains("Form R-b").click();

    cy.contains("Submit").should("be.visible").click();
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-b");

    //-- Section 1 - Doctor's details --
    cy.contains("Section 1: Doctor's details").should("be.visible");
    cy.get(".nhsuk-warning-callout > p").should("be.visible");

    //--Personal Details section
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
    // intentionally left email blank
    cy.get("#localOfficeName > option")
      .eq(1)
      .then(element => {
        const selectedItem = element.val().toString();
        cy.get("#localOfficeName")
          .focus()
          .select(selectedItem)
          .should("not.have.value", "--Please select--");
      });
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
    cy.get(".nhsuk-pagination__page").should("be.visible");
    cy.contains("Section 2").should("be.visible").click();

    // check form validation
    cy.get(".nhsuk-error-message").should("be.visible");
    cy.get("#email").type("traineeui.tester@hee.nhs.uk");
    cy.get(".nhsuk-pagination__page").click();

    // -- Section 2 Whole Scope Types of Work
    cy.contains("Whole Scope of Practice").should("be.visible");
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.contains("Type of work").should("be.visible");
    cy.contains("Add more").should("be.visible");
    cy.contains("TOOT").should("be.visible");

    // edit first work panel
    cy.get("[data-cy=workTypeInput0]")
      .should("be.visible")
      .clear()
      .type("In Post Doing Something");
    cy.get("[data-cy=startInput0]")
      .should("be.visible")
      .clear()
      .type("3000-12-31");

    //navigate back to section 1
    cy.get(
      ".nhsuk-pagination-item--previous > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.contains("Section 1").should("be.visible");

    //Return to section 2 and data is unchanged
    cy.get(".nhsuk-pagination__page").click();
    cy.get("[data-cy=workTypeInput0]").should(
      "contain.value",
      "In Post Doing Something"
    );
    cy.get("[data-cy=startInput0]").should("contain.value", "3000-12-31");

    cy.get("[data-cy=BtnAddWorkType]").should("be.visible");

    // Total TOOT data
    cy.get("#sicknessAbsence").should("be.visible").clear().type("10");
    cy.get("#paidLeave").should("be.visible").clear().type("1");
    cy.get("#totalLeave").should("have.value", "11");

    //Attempt to clcik next to submit form
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    )
      .should("be.visible")
      .click();

    cy.get(".nhsuk-error-summary").should("be.visible");
  });
});
