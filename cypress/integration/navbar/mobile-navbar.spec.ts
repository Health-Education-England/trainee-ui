/// <reference types="cypress" />

describe("Mobile header", () => {
  it("Should be able to toggle search button to show hide search form", () => {
    cy.viewport("iphone-6");
    cy.get(".nhsuk-header__search-toggle > .nhsuk-icon").click();
    cy.get("#search-field").should("be.visible");
    cy.get(".nhsuk-search__close > .nhsuk-icon > path").click();
    cy.get("#search-field").should("not.be.visible");
  });

  it("Menu button should show / hide menu items & navigate to Form R part A", () => {
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("be.visible").click();
    cy.contains("Logout").should("be.visible");
    cy.contains("Menu").click();
    cy.contains("Logout").should("not.be.visible");
    cy.contains("Menu").click();
    cy.get(".nhsuk-header__search-toggle > .nhsuk-icon").click();
    cy.get("#search-field").should("be.visible");
    cy.contains("Form R-a").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-a");
  });
});
