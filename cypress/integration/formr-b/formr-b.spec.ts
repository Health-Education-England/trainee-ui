/// <reference types="cypress" />

let currentDate = Cypress.moment().format("YYYY-MM-DD");
let futureDate = Cypress.moment(currentDate).add(6, "M").format("YYYY-MM-DD");
let pastDate = Cypress.moment(currentDate)
  .subtract(6, "M")
  .format("YYYY-MM-DD");

let outOfRangeFutureDate = Cypress.moment(futureDate)
  .add({ years: 20 })
  .format("YYYY-MM-DD");

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
    cy.get("[data-cy=mainWarning1]").should("be.visible");
    cy.get("[data-cy=legendFieldset1]").should("be.visible");
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
    cy.get("#email").should("be.visible");
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

    // -------- Section 2 Whole Scope Types of Work -----------
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
      .type(outOfRangeFutureDate);

    //navigate back to section 1
    cy.get(
      ".nhsuk-pagination-item--previous > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=mainWarning1]").should("be.visible");

    //Return to section 2 and data is unchanged
    cy.get(".nhsuk-pagination__page").click();
    cy.get("[data-cy=workTypeInput0]").should(
      "contain.value",
      "In Post Doing Something"
    );
    cy.get("[data-cy=startInput0]").should(
      "contain.value",
      outOfRangeFutureDate
    );

    cy.get("[data-cy=BtnAddWorkType]").should("be.visible");

    // Total TOOT data
    cy.get("#sicknessAbsence").should("be.visible").clear().type("10");
    cy.get("#paidLeave").should("be.visible").clear().type("1");
    cy.get("#totalLeave").should("have.value", "11");

    //Attempt to click next to submit form
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    )
      .should("be.visible")
      .click();

    cy.get(".nhsuk-error-summary").should("be.visible");

    // Delete 'Type of work' x3
    cy.get("[data-cy=closeIcon1]").click().click().click();

    // Fix form errors
    cy.get("[data-cy=startInput0]").clear().type(pastDate);
    cy.get('[data-cy="work[1].trainingPost"]').select("Yes");
    cy.get(".nhsuk-error-summary").should("not.be.visible");

    // Add a new 'Type of work'
    cy.get("[data-cy=BtnAddWorkType]").click();
    cy.get("[data-cy=workTypeInput2]")
      .should("be.visible")
      .type("Another type of work");
    cy.get('[data-cy="work[2].trainingPost"]')
      .should("be.visible")
      .select("No");
    cy.get("[data-cy=startInput2]").should("be.visible").type(pastDate);
    cy.get("[data-cy=endInput2]").should("be.visible").type(currentDate);
    cy.get("[data-cy=siteNameInput2]")
      .should("be.visible")
      .type("This other site");
    cy.get("[data-cy=siteLocInput2]").should("be.visible").type("Over there");

    // Click next to submit form
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();

    // -------- Section 3 Declarations relating to Good Medical Practice -----------
    cy.get("[data-cy=legendFieldset3]").should("include.text", "Section 3");
    cy.get("[data-cy=mainWarning3]").should("be.visible");
    cy.get("[data-cy=declarations]").should("be.visible");
    cy.get("[data-cy=healthStatement]").should("be.visible");
    // Navigate back to section 2
    cy.get(
      ".nhsuk-pagination-item--previous > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get("[data-cy=mainWarning2]").should("be.visible");
    // Section 2 data is unchanged
    cy.get("#totalLeave").should("be.visible").should("contain.value", "11");
    // Return to section 3
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get("[data-cy=isHonest0]")
      .should("be.visible")
      .should("contain.value", "")
      .click();
    cy.get("[data-cy=isHealthy0]")
      .should("be.visible")
      .should("contain.value", "")
      .click();
    cy.get("[data-cy=isComplying0]").should("not.be.visible");
    cy.get("[data-cy=isWarned0]")
      .should("be.visible")
      .should("contain.value", "")
      .click();
    cy.get("[data-cy=isComplying0]").should("be.visible").click();
    cy.get("[data-cy=healthStatementTextInput]")
      .should("be.visible")
      .type("I'm in astonishingly excellent health.");

    // Go to view / edit / submit
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get("[data-cy=BtnEditSection1]").should("be.visible");
    cy.get("[data-cy=gmcNumber]").should("be.visible");
    cy.get("[data-cy=BtnEditSection2]").should("be.visible");
    cy.get("[data-cy=typeOfWork3]").should("be.visible");
    cy.get("[data-cy=BtnEditSection3]").should("be.visible");

    // Click edit btn to edit section 1 details
    cy.get(".nhsuk-back-link__link").should("be.visible");
    cy.get("[data-cy=BtnEditSection1]").should("be.visible").click();
    cy.get("#gmcNumber").clear().type("22222222");
    cy.get(".nhsuk-pagination__page").click();

    cy.get("[data-cy=workTypeInput2]").should(
      "contain.value",
      "Another type of work"
    );
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();

    cy.get("[data-cy=healthStatementTextInput]").should(
      "contain.value",
      "I'm in astonishingly excellent health."
    );
    cy.get(
      ".nhsuk-pagination-item--next > .nhsuk-pagination__link > .nhsuk-pagination__page"
    ).click();
    cy.get("[data-cy=gmcNumber]").should("have.text", "22222222");

    cy.get(':nth-child(2) > [type="submit"]').should("be.visible").click();

    // See list of saved forms
    cy.contains("Submitted forms").should("be.visible");
    cy.get("[data-cy=submittedForm0]").should("be.visible");
  });
});
