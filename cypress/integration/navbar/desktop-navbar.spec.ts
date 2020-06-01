/// <reference types="cypress" />
beforeEach(() => {
  cy.viewport("macbook-15");
});

describe("Desktop/ tablet header", () => {
  it("Menu items including Logout button should be visible and clickable.", () => {
    cy.contains("Profile").should("be.visible");
    cy.contains("Form R-b").should("be.visible");
    cy.contains("Logout").should("be.visible");
    cy.get("#search-field")
      .click()
      .should("be.visible");
    cy.contains("Form R-a")
      .should("be.visible")
      .click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-a");
  });
});
