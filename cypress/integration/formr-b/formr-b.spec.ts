/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

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
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("be.visible").click();
    cy.contains("Form R-b").click();

    cy.contains("Submit").should("be.visible").click();
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-b");

    // -------- Section 1 - Doctor's details -----------
    cy.checkAndFillSection1(currRevalDate, prevRevalDate);

    cy.get("#gmcNumber").focus().clear();
    cy.get("#email").focus().clear();

    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page")
      .should("be.visible")
      .click();

    cy.get(".nhsuk-error-summary").should("be.visible");
    cy.get("#gmcNumber").type("11111111");
    cy.get("#email").type("traineeui.tester@hee.nhs.uk");
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page").click();

    // -------- Section 2 Whole Scope Types of Work -----------
    cy.checkAndFillSection2(pastDate);

    cy.get('[data-cy="work[0].startDate"]')
      .should("be.visible")
      .clear()
      .type(outOfRangeFutureDate);

    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page")
      .should("be.visible")
      .click();
    cy.get(".nhsuk-error-summary").should("be.visible");

    cy.get('[data-cy="work[0].startDate"]').clear().type(pastDate);
    cy.get(".nhsuk-error-summary").should("not.be.visible");

    cy.addWorkPanel(pastDate, currentDate);

    //Navigate back to section 1
    cy.get("[data-cy=BacklinkToSection1] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=mainWarning1]").should("be.visible");

    //Return to section 2
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page").click();

    // -------- Section 3 Declarations relating to Good Medical Practice -----------
    cy.checkAndFillSection3();

    // Navigate back to section 2
    cy.get("[data-cy=BacklinkToSection2] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning2]").should("be.visible");
    cy.get("#totalLeave").should("be.visible").should("contain.value", "21");

    // Return to section 3
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection4] > .nhsuk-pagination__page").click();

    // -------- Section 4: Update to your previous Form R Part B -----------
    cy.checkAndFillSection4(pastDate);

    // Navigate back to section 3
    cy.get("[data-cy=BacklinkToSection3] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning3]").should("be.visible");
    cy.get(".nhsuk-form-group > [data-cy=healthStatement]")
      .should("be.visible")
      .type("I'm in astonishingly excellent health.");

    // Return to section 4
    cy.get("[data-cy=linkToSection4] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection5] > .nhsuk-pagination__page").click();

    // -------- Section 5: Update to your previous Form R Part B -----------
    cy.checkAndFillSection5(pastDate);

    // Navigate back to section 4
    cy.get("[data-cy=BacklinkToSection4] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning4]").should("be.visible");

    // Return to section 5
    cy.get("[data-cy=linkToSection5] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection6] > .nhsuk-pagination__page").click();

    // -------- Section 6: Compliments -----------
    cy.checkAndFillSection6("This is the compliment text.");

    // Navigate back to section 5
    cy.get("[data-cy=BacklinkToSection5] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning5]").should("be.visible");

    // Return to section 6
    cy.get("[data-cy=linkToSection6] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=compliments]")
      .should("be.visible")
      .should("contain.value", "This is the compliment text.");

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection7] > .nhsuk-pagination__page").click();

    // -------- Section 7: Declarations -----------

    // Initial state
    cy.get("[data-cy=legendFieldset7]").should("include.text", "Section 7");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("be.visible")
      .should("contain.value", "true")
      .should("not.be.checked");
    cy.get("[data-cy=isConsentAccepted0]")
      .should("be.visible")
      .should("contain.value", "true")
      .should("not.be.checked");

    //Attempt to submit without checking boxes should fail
    cy.get("[data-cy=linkToSubmit] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=isDeclarationAccepted] .nhsuk-error-message").should(
      "be.visible"
    );
    cy.get("[data-cy=isConsentAccepted] .nhsuk-error-message").should(
      "be.visible"
    );

    //Toggle error message when clicked
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("not.be.checked");
    cy.get("[data-cy=isDeclarationAccepted] .nhsuk-error-message").should(
      "be.visible"
    );

    // Go back to section 6
    cy.get("[data-cy=isConsentAccepted0]").click().should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");

    cy.get("[data-cy=BacklinkToSection6] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=compliments]").should("be.visible");

    // Return to section 7
    cy.get("[data-cy=linkToSection7] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=isConsentAccepted0]")
      .should("be.visible")
      .should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("be.visible")
      .should("be.checked");

    // Navigate to submit page
    cy.get("[data-cy=linkToSubmit] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=BtnEditSection1]").should("be.visible");
    cy.get("[data-cy=gmcNumber]").should("be.visible");
    cy.get("[data-cy=BtnEditSection2]").should("be.visible");
    cy.get("[data-cy=typeOfWork3]").should("be.visible");
    cy.get("[data-cy=BtnEditSection3]").should("be.visible");
    cy.get("[data-cy=BtnEditSection4]").should("be.visible");
    cy.get("[data-cy=BtnEditSection5]").should("be.visible");

    // Click edit btn to edit section 1 details
    cy.get(".nhsuk-back-link__link").should("be.visible");
    cy.get("[data-cy=BtnEditSection1]").should("be.visible").click();
    cy.get("#gmcNumber").clear().type("11111111");

    // Navigate to section 2
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page").click();

    cy.get('[data-cy="work[2].typeOfWork"]').should(
      "contain.value",
      "Another type of work"
    );

    // Navigate to section 3
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-form-group > [data-cy=healthStatement]").should(
      "contain.value",
      "I'm in astonishingly excellent health."
    );

    // Navigate to section 4
    cy.get("[data-cy=linkToSection4] > .nhsuk-pagination__page").click();

    cy.get('[data-cy="previousDeclarations[0].declarationType"]')
      .should("be.visible")
      .select("Significant event");

    // Navigate to section 5
    cy.get("[data-cy=linkToSection5] > .nhsuk-pagination__page").click();

    cy.get('[data-cy="currentDeclarations[0].declarationType"]')
      .should("be.visible")
      .select("Significant event");

    // Navigate to section 6
    cy.get("[data-cy=linkToSection6] > .nhsuk-pagination__page").click();

    cy.get("[data-cy=compliments]")
      .should("be.visible")
      .should("contain.value", "This is the compliment text.");

    // Navigate to section 7
    cy.get("[data-cy=linkToSection7] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=isConsentAccepted0]")
      .should("be.visible")
      .should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("be.visible")
      .should("be.checked");

    // Navigate to submit
    cy.get("[data-cy=linkToSubmit] > .nhsuk-pagination__page").click();

    cy.get("[data-cy=gmcNumber]").should("have.text", "11111111");
    cy.get("[data-cy=BtnSubmitPartB]").should("be.visible").click();

    // See list of saved forms
    cy.contains("Submitted forms").should("be.visible");

    //open the form just saved
    cy.get("[data-cy=submittedForm]").first().should("be.visible").click();
    cy.get("[data-cy=gmcNumber]")
      .should("be.visible")
      .should("have.text", "11111111");
    cy.get("[data-cy=localOfficeName]").should(
      "have.text",
      "Health Education England Wessex"
    );
    // Navigate back to the list
    cy.get(".nhsuk-back-link__link").should("be.visible").click();
    cy.contains("Submitted forms").should("be.visible");
  });
});
