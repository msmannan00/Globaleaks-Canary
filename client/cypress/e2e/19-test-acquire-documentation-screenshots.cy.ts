describe("acquire screenshots necessary for user documentation", () => {
  beforeEach(() => {
    cy.login_admin();
  });

  it("should navigate through some admin sections to collect screenshots", () => {
    // Home section
    cy.get("#admin_home").first().click();
    cy.takeScreenshot("admin/home");

    cy.get(".changelog").first().click();
    cy.takeScreenshot("admin/changelog");

    cy.get(".license").first().click();
    cy.takeScreenshot("admin/license");

    cy.get("#admin_settings").first().click();
    cy.takeScreenshot("admin/site_settings_main_configuration");
    cy.get('#Content').takeScreenshot('admin/site_settings_logo_detail', { capture: 'viewport' });

    cy.get(".files").first().click();
    cy.takeScreenshot("admin/site_settings_files");

    cy.get(".languages").first().click();
    cy.takeScreenshot("admin/site_settings_languages", 500);
    cy.get('#Content').takeScreenshot('admin/site_settings_languages_detail', { capture: 'viewport' });

    cy.get(".text_customization").first().click();
    cy.takeScreenshot("admin/site_settings_text_customization");

    cy.get(".advanced").first().click();
    cy.takeScreenshot("admin/advanced_settings");

    cy.get("#admin_users").first().click();
    cy.takeScreenshot("admin/users");
    cy.get(".options").first().click();
    cy.takeScreenshot("admin/users_options");

    cy.get("#admin_questionnaires").first().click();
    cy.takeScreenshot("admin/questionnaires");

    cy.get(".question_templates").first().click();
    cy.takeScreenshot("admin/question_templates");

    cy.get("#admin_case_management").first().click();
    cy.takeScreenshot("admin/report_statuses");

    cy.get("#admin_notifications").first().click();
    cy.takeScreenshot("admin/notification_settings");
    cy.get('#Content').takeScreenshot('admin/notification_settings_detail', { capture: 'viewport' });
    cy.get(".templates").first().click();
    cy.takeScreenshot("admin/notification_templates");

    cy.get("#admin_network").first().click();
    cy.takeScreenshot("admin/tor");

    cy.get(".https").first().click();
    cy.takeScreenshot("admin/https");

    cy.get(".tor").first().click();
    cy.takeScreenshot("admin/https");

    cy.get(".access_control").first().click();
    cy.takeScreenshot("admin/access_control");

    cy.get(".url_redirects").first().click();
    cy.takeScreenshot("admin/url_redirects");

    cy.get("#admin_audit_log").first().click();
    cy.takeScreenshot("admin/audit_log");

    cy.get('.users').click();
    cy.takeScreenshot("admin/audit_log_users");

    cy.get(".reports").first().click();
    cy.takeScreenshot("admin/audit_log_reports");

    cy.get(".scheduled_jobs").first().click();
    cy.takeScreenshot("admin/audit_log_scheduled_jobs");

    cy.logout();
  });
});
