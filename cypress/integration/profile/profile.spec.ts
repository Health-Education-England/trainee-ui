/// <reference types="cypress" />
describe("Profile", () => {
  it("should show name by default then on click expand to show all personal information", () => {
    cy.get("#traineeName").should("not.be.empty");
    cy.get(
      ".makeStyles-sectionPadding-3 > .MuiPaper-root > #panel1a-header"
    ).click();
    cy.contains("Gender").should("be.visible");
  });

  it("should show placement information by default", () => {
    cy.contains("Placements");
    cy.get("#traineeName").should("be.visible");
  });

  it("should close placement container after clicking placement container header", () => {
    cy.contains("Placements").click();
    cy.get("#placementContainer").should("not.visible");
  });

  it("should show programme information by default", () => {
    cy.contains("Programmes");
    cy.get("#programmeContainer").should("be.visible");
  });

  it("should close programme container after clicking programme container header", () => {
    cy.contains("Programmes").click();
    cy.get("#programmeContainer").should("not.visible");
  });
});
