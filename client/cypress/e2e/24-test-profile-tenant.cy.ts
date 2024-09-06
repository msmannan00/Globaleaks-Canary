describe("admin configure and add profile tenant", () => {
  const add_profile = (name: string, tenant?: boolean) => {
    if (tenant) {
      cy.get(".show-add-tenant-btn").click();
      cy.get("[name='newTenant.name']").type(name);
      cy.get('select[name="profile"]').should('be.visible');
      cy.get('select[name="profile"]').select(1);
      cy.get("#add-btn").click();
      cy.contains(name).should("exist");
    } else {
      cy.get(".show-add-profile-btn").click();
      cy.get("[name='newTenant.name']").type(name);
      cy.get("#add-btn").click();
      cy.contains(name).should("exist");
    }
  };

  it("should add new tenant", () => {
    cy.login_admin();
    cy.visit("/#/admin/sites");
    cy.get('[data-cy="profiles"]').click().should("be.visible", { timeout: 10000 }).click();
    add_profile("Platform D");

    cy.intercept('GET', '/api/auth/tenantauthswitch/**').as('tenantAuthSwitch');
    cy.window().then((win) => { cy.stub(win, 'open').as('windowOpen'); });
    cy.get('[data-cy="configure"]').first().click();

    cy.wait('@tenantAuthSwitch', { timeout: 10000 }).then((interception: any) => {
      const redirectUrl = interception.response.body.redirect;
      cy.get('@windowOpen').should('be.calledWith', redirectUrl);
      cy.visit(redirectUrl);
    });

    cy.get("#admin_settings").click();
    cy.get("textarea[name='nodeResolver.dataModel.footer']", { timeout: 20000 }).should("be.visible").type("dummy_footer");
    cy.get("#save_settings").click();
    cy.get('[data-cy="advanced"]').click().should("be.visible", { timeout: 10000 }).click();
    cy.get('input[name="disable_submissions"]').click();
    cy.get('input[name="node.dataModel.pgp"]').click();
    cy.get("#save").click();

    cy.login_admin();
    cy.visit("/#/admin/sites");
    cy.get('[data-cy="sites"]').click().should("be.visible", { timeout: 10000 }).click();
    add_profile("Platform E", true);

    cy.intercept('GET', '/api/auth/tenantauthswitch/**').as('tenantAuthSwitch');
    cy.window().then((win: any) => {
      if (win.open.restore) {
        win.open.restore();
      }
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-cy="configure"]').last().click();
    cy.wait('@tenantAuthSwitch', { timeout: 10000 }).then((interception: any) => {
      const redirectUrl = interception.response.body.redirect;
      cy.get('@windowOpen').should('be.calledWith', redirectUrl);
      cy.visit(redirectUrl);
    });
    cy.get("#admin_settings").click();
    cy.get("textarea[name='nodeResolver.dataModel.footer']", { timeout: 20000 }).should("be.visible").clear();
    cy.get("#save_settings").click();
    cy.get('[data-cy="advanced"]').click().should("be.visible", { timeout: 10000 }).click();
    cy.get('input[name="disable_submissions"]').click();
    cy.get('input[name="node.dataModel.pgp"]').click();
    cy.get("#save").click();
    cy.logout();
  });
});
