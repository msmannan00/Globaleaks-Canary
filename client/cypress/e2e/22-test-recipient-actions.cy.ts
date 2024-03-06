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
  it("should set a postpone date for reports", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();
    cy.get("#tip-action-postpone").click();
    cy.get('.modal').should('be.visible');
    cy.get('input[name="dp"]').invoke('val').then((currentDate: any) => {
      const current = new Date(currentDate);
      const nextDay = new Date(current);
      nextDay.setDate(nextDay.getDate() + 1);
      cy.get('input[name="dp"]').click();
      cy.get('.ngb-dp-day').contains(nextDay.getDate()).click();
      const formattedNextDay = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1).toString().padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;
      cy.get('input[name="dp"]').should('have.value', formattedNextDay);
    });
    cy.get('#modal-action-ok').click();
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

describe("admin configure duplicate questionnaire", function () {
  it("should add duplicate questionnaire", function () {
    cy.login_admin();
    cy.visit("/#/admin/questionnaires");
    cy.get(".fa-clone").first().click();
    cy.get('input[name="name"]').type("duplicate questionnaire");
    cy.get("#modal-action-ok").click();
    cy.logout();
  });
});

describe("admin add and remove disclaimer", function () {
  it("should add disclaimer", function () {
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

describe("admin add and remove user privacy policy", function () {
  it("should add and remove user privacy policy", function () {
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

describe("file upload on recipient side", function () {
  it("should upload a file", function () {
    cy.login_receiver();
    cy.visit("/#/recipient/reports");
    cy.get("#tip-0").first().click();
    cy.get('#upload_description').type("description");
    cy.get('i.fa-solid.fa-upload').click();
    cy.fixture("files/dummy-image.jpg").then(fileContent => {
      cy.get('input[type="file"]').then(input => {
        const blob = new Blob([fileContent], { type: "image/jpeg" });
        const testFile = new File([blob], "files/dummy-image.jpg");
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        const inputElement = input[0] as HTMLInputElement;
        inputElement.files = dataTransfer.files;

        const changeEvent = new Event("change", { bubbles: true });
        input[0].dispatchEvent(changeEvent);
      });

    });
    cy.logout();
  });
  describe("multiple filter report tests", () => {
    it("should check multiple filter of report", function () {
      cy.login_receiver();

      cy.visit("/#/recipient/reports");

      // serch filter
      cy.get('span#SearchFilter input[type="text"]').type("your search term");
      cy.get('span#SearchFilter input[type="text"]').clear();

      // sorting filter
      cy.get('th.TipInfoID').click();
      cy.wait(500);
      cy.get('th.TipInfoID').click();

      // context filter
      cy.get('th.TipInfoContext i.fa-solid.fa-filter').click();
      cy.get('.multiselect-item-checkbox').eq(1).click();
      cy.get('.multiselect-item-checkbox').eq(0).click();

      // submission filter
      cy.get('.TipInfoSubmissionDate .fas.fa-calendar').click();
      cy.get('.custom-day').first().click();
      cy.get('.custom-day').eq(4).click({ shiftKey: true });
      cy.contains('button.btn.btn-danger', 'Reset').click();

      cy.logout();
    });
  });
  describe("apply grant and revoke access to selected reports", () => {
    it("should apply grant and revoke access to selected reports for a specific recipient", function () {
      cy.login_receiver();

      cy.visit("/#/recipient/reports");
      // grant access selected reports
      cy.get('#tip-action-select-all').click();
      cy.get('#tip-action-grant-access-selected').click();
      cy.get('[data-cy="reciever_selection"]').click();
      cy.get('.ng-dropdown-panel').should('be.visible');
      cy.get('[data-cy="reciever_selection"]').click();
      cy.contains('.ng-option', 'Recipient2').click();
      cy.get("#modal-action-ok").click();

      cy.wait(500);

      // revoke access selected reports
      cy.get('#tip-action-reload').click();
      cy.get('#tip-action-select-all').click();
      cy.get("#tip-action-revoke-access-selected").click();
      cy.get('[data-cy="reciever_selection"]').click();
      cy.get('.ng-dropdown-panel').should('be.visible');
      cy.get('[data-cy="reciever_selection"]').click();
      cy.contains('.ng-option', 'Recipient2').click();
      cy.get("#modal-action-ok").click();
      cy.logout();
    });
  });
});