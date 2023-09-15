declare namespace Cypress {
  interface Chainable {
    takeScreenshot: typeof takeScreenshot;
    waitForLoader: () => void;
    logout: () => void;
    waitUntilClickable: (locator: string, timeout?: number) => void;
  }

}

function takeScreenshot(filename: string, locator?: string) {
  if (!Cypress.env('takeScreenshots')) {
    return;
  }

  cy.document().then((doc: Document) => {
    const height = doc.body.scrollHeight;
    cy.viewport(1280, height);
  });

  cy.screenshot(filename, {
    overwrite: true
  });
}
Cypress.Commands.add("waitUntilClickable", (locator: string, timeout?: number) => {
  const t = timeout === undefined ? Cypress.config().defaultCommandTimeout : timeout;
  cy.get(locator).click({ timeout: t });
});

Cypress.Commands.add("waitForLoader", () => {
  cy.get('#PageOverlay').should('not.have.class', 'ng-hide');
  cy.get('#PageOverlay.ng-hide');
});

Cypress.Commands.add("logout", () => {
  cy.waitUntilClickable("#LogoutLink");
});

Cypress.Commands.add("takeScreenshot", takeScreenshot);