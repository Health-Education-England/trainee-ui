/// <reference types="cypress" />
describe("Profile", () => {
  beforeEach(() => {
    cy.visit("./profile");
  });

  describe("Personal Details", () => {
    it("should show personal information", () => {
      cy.get("#personalDetailContainer").should("be.visible");
    });
  });

  describe("Programme", () => {
    it("should show programme information by default", () => {
      cy.contains("Programmes");
      cy.get("#programmeContainer").should("be.visible");
    });

    it("shoud close programme container after clicking programme container header", () => {
      cy.contains("Programmes").click();
      cy.get("#programmeContainer").should("not.visible");
    });
  });

  describe("Placement", () => {
    it("should show placment information by default", () => {
      cy.contains("Placements");
      cy.get("#placementContainer").should("be.visible");
    });

    it("shoud close placement container after clicking placement container header", () => {
      cy.contains("Placements").click();
      cy.get("#placementContainer").should("not.visible");
    });
  });
});
