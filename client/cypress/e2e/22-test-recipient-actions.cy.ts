describe("recipient admin tip actions", () => {
  it("should revoke and grant access to reports", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();

    cy.get("#tip-action-revoke-access").should('be.visible', { timeout: 10000 }).click();
    cy.get('[data-cy="reciever_selection"]').click();
    cy.get('.ng-dropdown-panel').should('be.visible');
    cy.get('[data-cy="reciever_selection"]').click();
    cy.get("#modal-action-ok").click();

    cy.get("#tip-action-grant-access").should('be.visible', { timeout: 10000 }).click();
    cy.get('[data-cy="reciever_selection"]').click();
    cy.get('.ng-dropdown-panel').should('be.visible');
    cy.get('[data-cy="reciever_selection"]').click();
    cy.get("#modal-action-ok").click();

    cy.logout();
  });
  it("should close and reopen reports", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();

    cy.get("#tip-action-change-status").click();
    cy.get('#assignSubmissionStatus', { timeout: 10000 }).select(1);
    cy.get('textarea[name="reason"]').type("This is a close status illatest motivation");
    cy.get("#modal-action-ok").click();
    cy.get("#tip-action-reopen-status").click();
    cy.get('textarea[name="motivation"]').type("This is a Reopen status test motivation");
    cy.get("#modal-action-ok").click();

    cy.logout();
  });
  it("recipient should file a report on behalf of whistleblower", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-action-open-new-tab").click();
    cy.visit("/#/recipient/reports");

    cy.logout();
  });

  it("should set a reminder date for reports", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();
    cy.get("#tip-action-reminder").click();
    cy.get('.modal').should('be.visible');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    cy.get('input[name="dp"]').click().clear();
    cy.get('input[name="dp"]').click().type(formattedDate);
    cy.get('#modal-action-ok').click();

    cy.logout();
  });
  it("should add new status and sub-status in the admin section", () => {
    cy.login_admin();

    cy.visit("/#/admin/casemanagement");
    cy.get(".config-section").should("be.visible");
    cy.get(".show-add-user-btn").click();
    cy.get(".addSubmissionStatus").should("be.visible");
    cy.get('input[name="name"]').type("Partial");
    cy.get("#add-btn").click();
    cy.get(".config-section").contains("Partial").should("be.visible").click();
    cy.get("#add-sub-status").click();
    cy.get('input[name="label"]').type("closed");
    cy.get("#add-submission-sub-status").click();

    cy.logout();
  });
  it("should change sub-status for reports", function () {
    cy.login_receiver();
    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();
    cy.get("#tip-action-change-status").click();
    cy.get('#assignSubmissionStatus', { timeout: 10000 }).select(0);
    cy.get('textarea[name="reason"]').type("This is a test motivation");
    cy.get("#modal-action-ok").click();
    cy.logout();
  });
});

describe("admin configure duplicate questionnaire", function() {
  it("should add duplicate questionnaire", function() {
    cy.login_admin();
    cy.visit("/#/admin/questionnaires");
    cy.get(".fa-clone").first().click();
    cy.get('input[name="name"]').type("duplicate questionnaire");
    cy.get("#modal-action-ok").click();
    cy.logout();
  });
});

describe("admin add and remove disclaimer", function() {
  it("should add disclaimer", function() {
    cy.login_admin();
    cy.visit("/#/admin/settings");
    cy.get('textarea[name="nodeResolver.dataModel.disclaimer_text"]').type("disclaimer_text");
    cy.get("#save_settings").click();
    cy.visit("#/");
    cy.get("#WhistleblowingButton").click();
    cy.get('#modal-action-ok').click();
    cy.login_admin();
    cy.visit("/#/admin/settings");
    cy.get('textarea[name="nodeResolver.dataModel.disclaimer_text"]').clear();
    cy.get("#save_settings").click();
    cy.logout();
  });
});

describe("admin add and remove user privacy policy", function() {
  it("should add and remove user privacy policy", function() {
    cy.login_admin();
    cy.visit("/#/admin/users");
    cy.get('[data-cy="options"]').click();
    cy.get('textarea[name="nodeData.user_privacy_policy_text"]').type("user_privacy_policy_text");
    cy.get('input[name="nodeData.user_privacy_policy_url"]').type("user_privacy_policy_url");
    cy.get("#save_user_policy").click();
    cy.visit("/#/admin/home");
    cy.get('input[name="tos2"]').check();
    cy.get('#modal-action-ok').click();
    cy.get("#admin_users").click();
    cy.get('[data-cy="options"]').click();
    cy.get('textarea[name="nodeData.user_privacy_policy_text"]').clear();
    cy.get('input[name="nodeData.user_privacy_policy_url"]').clear();
    cy.get("#save_user_policy").click();
    cy.logout();
  });
});