declare namespace Cypress {
  interface Chainable {
    waitForLoader: () => void;
    logout: () => void;
    takeScreenshot: (filename: string) => void;
    waitUntilClickable: (locator: string, timeout?: number) => void;
    waitForUrl: (url: string, timeout?: number) => Chainable<any>;
    login_admin: (username?: string, password?: string, url?: string, firstlogin?: boolean) => void;
  }
}

function takeScreenshot(filename: string) {
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

Cypress.Commands.add("waitForUrl", (url: string, timeout?: number) => {
  const t = timeout === undefined ? Cypress.config().defaultCommandTimeout : timeout;
  return cy.url().should("include", url, { timeout: t });
});

Cypress.Commands.add("login_admin", (username, password, url, firstlogin) => {
  username = username === undefined ? "admin" : username;
  password = password === undefined ? Cypress.env("user_password") : password;
  url = url === undefined ? "login" : url;

  let finalURL = "";

  cy.visit(url);

  cy.get('[name="username"]').type(username);

  // @ts-ignore
  cy.get('[name="password"]').type(password);
  cy.get("#login-button").click();

  if (firstlogin) {
    finalURL = "/actions/forcedpasswordchange";
    cy.waitForUrl(finalURL);
  } else {
    cy.url().should("include", "/login").then(() => {
      cy.url().should("not.include", "/login").then((currentURL) => {
        const hashPart = currentURL.split("#")[1];
        finalURL = hashPart === "login" ? "/admin/home" : hashPart;
        cy.waitForUrl(finalURL);
      });
    });
  }
});

Cypress.Commands.add("logout", () => {
  cy.waitUntilClickable("#LogoutLink");
});

Cypress.Commands.add("takeScreenshot", takeScreenshot);