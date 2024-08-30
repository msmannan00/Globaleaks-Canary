describe("admin configure and add profile tenant", () => {
    const add_profile = async (name:string,tenant?:boolean) => {
      
      if(tenant){
        cy.get(".show-add-tenant-btn").click();
        cy.get("[name='newTenant.name']").type(name);
        cy.get('select[name="profile"]').should('be.visible');
        cy.get('select[name="profile"]').select(1);
        cy.get("#add-btn").click();
        cy.contains(name).should("exist");
      }
      else{
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
      cy.get('[data-cy="sites"]').click().should("be.visible", { timeout: 10000 }).click();
      add_profile("Platform E",true);
      cy.logout();
    });
  });
  