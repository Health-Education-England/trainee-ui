/// <reference types="cypress" />
describe("Cypress", () => {
  it("should visit the app", () => {
    cy.visit("/");
  });
});
