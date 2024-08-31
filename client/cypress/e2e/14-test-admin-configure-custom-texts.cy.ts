describe("admin disable submissions", () => {
  it("should disable submission", () => {
    cy.login_admin();
    cy.visit("/#/admin/settings");
    cy.get('[data-cy="advanced"]').click();

    cy.get('input[name="disable_submissions"]').click();
    cy.get("#save").click();

    cy.logout();
    cy.visit("/#/");
  });
});

describe("admin configure custom texts", () => {
  it("should perform custom texts configuration", () => {
    cy.login_admin();
    cy.visit("/#/admin/settings");
    cy.get('[data-cy="text_customization"]').click();

    cy.get('select[name="vars.text_to_customize"]').select("Submissions disabled");

    cy.get("[name='vars.custom_text']").clear().type("Whistleblowing disabled");

    cy.get("#addCustomTextButton").click();

    cy.reload();
    cy.visit("/#/");
    cy.waitForUrl("/#/")
    cy.get('#submissions_disabled').should('contain', 'Whistleblowing disabled');

    cy.visit("/#/admin/settings");
    cy.get('[data-cy="text_customization"]').click();

    cy.get(".deleteCustomTextButton",{ timeout: 10000 }).click();
    cy.get(".deleteCustomTextButton",{ timeout: 10000 }).click();

    cy.logout();

    cy.visit("/#/");
    cy.reload();
    cy.get('#submissions_disabled').should('not.contain', 'Whistleblowing disabled');
  });
});
describe("admin enable submissions", () => {
  it("should enable submission", () => {
    cy.login_admin();
    cy.visit("/#/admin/settings");
    cy.get('[data-cy="advanced"]').click();

    cy.get('input[name="disable_submissions"]').click();
    cy.get("#save").click();
    cy.waitForUrl("/#/admin/settings");

    cy.get('#ngb-nav-12').click();
    cy.get('input[name="disable_submissions"]').should("be.visible").should("not.be.checked");
    cy.logout();
    cy.waitForUrl("/#/login");

    cy.visit("/#/");
    cy.get("#WhistleblowingButton").should("be.visible", { timeout: 10000 });
  });
});