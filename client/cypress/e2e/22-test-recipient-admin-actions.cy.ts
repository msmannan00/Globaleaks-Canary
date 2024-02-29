describe("Action: Revoke Access and Grant Access - Recipient Section", () => {
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
  it("should open a new tab for reports", function () {
    cy.login_receiver();

    cy.visit("/#/recipient/reports");
    cy.get("#tip-action-open-new-tab").click();
    cy.visit("/#/recipient/reports");

    cy.logout();
  });

  it("should set a reminder for reports", function () {
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
    cy.wait(5000);
    cy.get('#assignSubmissionStatus', { timeout: 10000 }).select(0);
    cy.get('textarea[name="reason"]').type("This is a test motivation");
    cy.get("#modal-action-ok").click();

    cy.logout();
  });
  it("should import questionnaire file and add report", () => {
    cy.login_admin();

    cy.visit("/#/admin/questionnaires");
    cy.get("#keyUpload").click();
    cy.fixture("files/testing.txt").then(fileContent => {
      cy.get('input[type="file"]').then(input => {
        const blob = new Blob([fileContent], { type: "text/plain" });
        const testFile = new File([blob], "files/testing.txt");
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        const inputElement = input[0] as HTMLInputElement;
        inputElement.files = dataTransfer.files;

        const changeEvent = new Event("change", { bubbles: true });
        input[0].dispatchEvent(changeEvent);
      });

    });
    cy.visit("/#/admin/contexts");
    cy.get("#edit_context").first().click();
    cy.get('select[name="contextResolver.questionnaire_id"]').select('Testing');
    cy.get("#save_context").click();
    cy.reload();
    cy.visit("#/");
    cy.get("#WhistleblowingButton").click();
    cy.get("#step-0").should("be.visible");
    cy.get("#step-0-field-0-0-input-0")
    cy.get("#start_recording").click();
    cy.wait(6000);
    cy.get("#stop_recording").click();
    cy.get("#NextStepButton").click();
    cy.get("input[type='text']").eq(1).should("be.visible").type("abc");
    cy.get("input[type='text']").eq(2).should("be.visible").type("xyz");
    cy.get("select").first().select(1);
    cy.wait(1000);
    cy.get("#SubmitButton").should("be.visible");

    cy.get("#SubmitButton").click();
    
    cy.get('.mt-md-3.clearfix.ng-star-inserted').find('#ReceiptButton').click(); 

    cy.logout();
  });
});