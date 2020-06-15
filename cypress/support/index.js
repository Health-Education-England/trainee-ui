import "./commands";

beforeEach(() => {
  cy.visit("./");

  if (cy.get("input[name=username]")) {
    cy.get("input[name=username]").type(Cypress.env("username"));
    cy.get("input[name=password]").type(`${Cypress.env("password")}{enter}`, {
      sensitive: true
    });
  }
});
