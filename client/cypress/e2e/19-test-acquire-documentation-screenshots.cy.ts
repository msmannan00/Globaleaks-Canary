describe("acquire screenshots necessary for user documentation", () => {
  beforeEach(() => {
    cy.login_admin();
  });

  it("should navigate through some admin sections to collect screenshots", () => {
    // Home section
    cy.get("#admin_home").first().click();
    cy.takeScreenshot("admin/home", 500);

    cy.get('[data-cy="changelog"]').first().click();
    cy.takeScreenshot("admin/changelog", 500);

    cy.get('[data-cy="license"]').first().click();
    cy.takeScreenshot("admin/license", 500);

    cy.get("#admin_settings").first().click();
    cy.takeScreenshot("admin/site_settings_main_configuration", 500);
    cy.get('#Content').takeScreenshot('admin/site_settings_logo_detail', 500, { capture: 'viewport' });

    cy.get('[data-cy="files"]').first().click();
    cy.takeScreenshot("admin/site_settings_files", 500);

    cy.get('[data-cy="languages"]').first().click();
    cy.takeScreenshot("admin/site_settings_languages", 500);
    cy.get('#Content').takeScreenshot('admin/site_settings_languages_detail', 500, { capture: 'viewport' });

    cy.get('[data-cy="text_customization"]').first().click();
    cy.takeScreenshot("admin/site_settings_text_customization", 500);

    cy.get('[data-cy="advanced"]').first().click();
    cy.takeScreenshot("admin/advanced_settings", 500);

    cy.get("#admin_users").first().click();
    cy.takeScreenshot("admin/users", 500);
    cy.get('[data-cy="options"]').first().click();
    cy.takeScreenshot("admin/users_options", 500);

    cy.get("#admin_questionnaires").first().click();
    cy.takeScreenshot("admin/questionnaires", 500);

    cy.get('[data-cy="question_templates"]').first().click();
    cy.takeScreenshot("admin/question_templates", 500);

    cy.get("#admin_case_management").first().click();
    cy.takeScreenshot("admin/report_statuses", 500);

    cy.get("#admin_notifications").first().click();
    cy.takeScreenshot("admin/notification_settings", 500);
    cy.get('#Content').takeScreenshot('admin/notification_settings_detail', 500, { capture: 'viewport' });
    cy.get('[data-cy="templates"]').first().click();
    cy.takeScreenshot("admin/notification_templates", 500);

    cy.get("#admin_network").first().click();
    cy.takeScreenshot("admin/tor", 500);

    cy.get('[data-cy="https"]').first().click();
    cy.takeScreenshot("admin/https", 500);

    cy.get('[data-cy="tor"]').first().click();
    cy.takeScreenshot("admin/https", 500);

    cy.get('[data-cy="access_control"]').first().click();
    cy.takeScreenshot("admin/access_control", 500);

    cy.get('[data-cy="url_redirects"]').first().click();
    cy.takeScreenshot("admin/url_redirects", 500);

    cy.get("#admin_audit_log").first().click();
    cy.takeScreenshot("admin/audit_log", 500);

    cy.get('[data-cy="users"]').click();
    cy.takeScreenshot("admin/audit_log_users", 500);

    cy.get('[data-cy="reports"]').first().click();
    cy.takeScreenshot("admin/audit_log_reports", 500);

    cy.get('[data-cy="scheduled_jobs"]').first().click();
    cy.takeScreenshot("admin/audit_log_scheduled_jobs", 500);

    cy.logout();
  });
});
