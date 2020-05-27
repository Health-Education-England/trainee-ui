/// <reference types="cypress" />

describe("Mobile app sign-in", () => {
  it("should show the Menu button on successful mobile sign-in", () => {
    cy.location("pathname", { timeout: 10000 }).should("include", "/profile");
    cy.get("#profile").should("be.visible");
    cy.contains("Personal details").should("be.visible");
    cy.contains("Placements").should("be.visible");
    cy.contains("Programmes").should("be.visible");
    cy.get(".nhsuk-header__search-toggle").should("be.visible");
    cy.get(".nhsuk-header__menu-toggle").should("be.visible");
  });
});

describe("Laptop/ PC app sign-in", () => {
  it("should show the Logout btn on successful desktop /ipad sign-in", () => {
    cy.viewport("macbook-15");
    cy.location("pathname", { timeout: 10000 }).should("include", "/profile");
    cy.get("#profile").should("be.visible");
    cy.contains("Personal details").should("be.visible");
    cy.contains("Placements").should("be.visible");
    cy.contains("Programmes").should("be.visible");
    cy.contains("Logout").should("be.visible");
    cy.get(":nth-child(1) > .nhsuk-header__navigation-link").should(
      "be.visible"
    );
  });
});
