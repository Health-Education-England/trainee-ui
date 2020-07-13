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
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("be.visible").click();
    cy.contains("Form R-b").click();

    cy.contains("Submit").should("be.visible").click();
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-b");

    // -------- Section 1 - Doctor's details -----------
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

    cy.get("#gmcNumber").focus();
    cy.get("#gmcNumber").clear();
    cy.get("#gmcNumber").type("11111111");

    // intentionally left email blank
    cy.get("#email").should("be.visible");

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
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page")
      .should("be.visible")
      .click();

    // check form validation
    cy.get(".nhsuk-error-summary").should("be.visible");
    cy.get("#email").type("traineeui.tester@hee.nhs.uk");
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page").click();

    // -------- Section 2 Whole Scope Types of Work -----------
    cy.contains("Whole Scope of Practice").should("be.visible");
    cy.get(".nhsuk-warning-callout > p").should("be.visible");
    cy.contains("Type of work").should("be.visible");
    cy.contains("Add more").should("be.visible");
    cy.contains("TOOT").should("be.visible");

    // edit first work panel
    cy.get('[data-cy="work[0].typeOfWork"]')
      .should("be.visible")
      .clear()
      .type("In Post Doing Something");
    cy.get('[data-cy="work[0].startDate"]')
      .should("be.visible")
      .clear()
      .type(outOfRangeFutureDate);

    //navigate back to section 1
    cy.get("[data-cy=BacklinkToSection1] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=mainWarning1]").should("be.visible");

    //Return to section 2 and data is unchanged
    cy.get("[data-cy=linkToSection2] > .nhsuk-pagination__page").click();
    cy.get('[data-cy="work[0].typeOfWork"]').should(
      "contain.value",
      "In Post Doing Something"
    );
    cy.get('[data-cy="work[0].startDate"]').should(
      "contain.value",
      outOfRangeFutureDate
    );

    cy.get("[data-cy=BtnAddWorkType]").should("be.visible");

    // Total TOOT data
    cy.get("#sicknessAbsence").should("be.visible").clear().type("10");
    cy.get("#paidLeave").should("be.visible").clear().type("1");
    cy.get("#totalLeave").should("have.value", "11");

    //Attempt to navigate to section 3
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page")
      .should("be.visible")
      .click();
    cy.get(".nhsuk-error-summary").should("be.visible");

    // Delete 'Type of work' panel x3
    cy.get("[data-cy=closeIcon1]").click().click().click();

    // Fix form errors
    cy.get('[data-cy="work[0].startDate"]').clear().type(pastDate);
    cy.get('[data-cy="work[1].trainingPost"]').select("Yes");
    cy.get(".nhsuk-error-summary").should("not.be.visible");

    // Add a new 'Type of work'
    cy.get("[data-cy=BtnAddWorkType]").click();
    cy.get('[data-cy="work[2].typeOfWork"]')
      .should("be.visible")
      .type("Another type of work");
    cy.get('[data-cy="work[2].trainingPost"]')
      .should("be.visible")
      .select("No");
    cy.get('[data-cy="work[2].startDate"]').should("be.visible").type(pastDate);
    cy.get('[data-cy="work[2].endDate"]')
      .should("be.visible")
      .type(currentDate);
    cy.get('[data-cy="work[2].site"]')
      .should("be.visible")
      .type("This other site");
    cy.get('[data-cy="work[2].siteLocation"]')
      .should("be.visible")
      .type("Over there");

    // Click to navigate to section 3
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page").click();

    // -------- Section 3 Declarations relating to Good Medical Practice -----------
    cy.get("[data-cy=legendFieldset3]").should("include.text", "Section 3");
    cy.get("[data-cy=mainWarning3]").should("be.visible");
    cy.get("[data-cy=declarations]").should("be.visible");
    cy.get("[data-cy=healthStatement]").should("be.visible");
    // Navigate back to section 2
    cy.get("[data-cy=BacklinkToSection2] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning2]").should("be.visible");
    // Section 2 data is unchanged
    cy.get("#totalLeave").should("be.visible").should("contain.value", "11");
    // Return to section 3
    cy.get("[data-cy=linkToSection3] > .nhsuk-pagination__page").click();
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
    cy.get(".nhsuk-form-group > [data-cy=healthStatement]")
      .should("be.visible")
      .type("I'm in astonishingly excellent health.");

    // Click to navigate to section 4
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection4] > .nhsuk-pagination__page").click();

    // -------- Section 4: Update to your previous Form R Part B -----------
    cy.get("[data-cy=legendFieldset4]").should("include.text", "Section 4");
    cy.get("[data-cy=mainWarning4]").should("be.visible");
    cy.get("[data-cy=declarations4]").should("be.visible");

    // Navigate back to section 3
    cy.get("[data-cy=BacklinkToSection3] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning3]").should("be.visible");
    // Section 3 data is unchanged
    cy.get(".nhsuk-form-group > [data-cy=healthStatement]")
      .should("be.visible")
      .type("I'm in astonishingly excellent health.");

    // Return to section 4
    cy.get("[data-cy=linkToSection4] > .nhsuk-pagination__page").click();

    // Fill section 4
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

    // Click to navigate to section 5
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection5] > .nhsuk-pagination__page").click();

    // -------- Section 5: Update to your previous Form R Part B -----------
    cy.get("[data-cy=legendFieldset5]").should("include.text", "Section 5");
    cy.get("[data-cy=mainWarning5]").should("be.visible");
    cy.get("[data-cy=declarations5]").should("be.visible");

    // Navigate back to section 4
    cy.get("[data-cy=BacklinkToSection4] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning4]").should("be.visible");
    // Section 4 data is unchanged

    // Return to section 5
    cy.get("[data-cy=linkToSection5] > .nhsuk-pagination__page").click();

    // Fill section 5
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

    // Click to navigate to section 6
    cy.get(".nhsuk-error-summary").should("not.be.visible");
    cy.get("[data-cy=linkToSection6] > .nhsuk-pagination__page").click();

    // -------- Section 6: Compliments -----------

    cy.get("[data-cy=legendFieldset6]").should("include.text", "Section 6");

    // Fill section 6
    // should be blank to begin with
    cy.get("[data-cy=compliments]")
      .should("be.visible")
      .should("contain.value", "");
    cy.get("[data-cy=compliments]").type("This is the compliment text.");

    // Navigate back to section 5
    cy.get("[data-cy=BacklinkToSection5] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning5]").should("be.visible");
    // Section 5 data is unchanged

    // Return to section 6
    cy.get("[data-cy=linkToSection6] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=compliments]")
      .should("be.visible")
      .should("contain.value", "This is the compliment text.");

    // Click to navigate to section 7
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
