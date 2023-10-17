const baseUrl = "http://localhost:3000";
const width = 375;
const height = 667;
describe("blog redux", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "admin",
      email: "admin@admin.com",
      password: "admin",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.viewport(width, height);
    cy.visit(baseUrl);
  });
  it("visits succesfully", () => {
    cy.contains("Carlos Portfolio");
  });

  it("visits signup and button is disabled", () => {
    cy.visit(`${baseUrl}/auth/signup`);
    cy.contains("Register");
    cy.get(":button").should("be.disabled");
  });

  it("creates an admin user", () => {
    cy.visit(`${baseUrl}/auth/signup`);
    cy.get("[id=username]").type("admin");
    cy.get("[id=email]").type("admin@admin.com");
    cy.get("[id=password]").type("admin");
    cy.get("[id=confirmPassword]").type("admin");

    cy.get(":button").should("be.enabled");
    cy.contains("Register").click();
  });

  it.only("creates an admin user fails because passwords dont match", () => {
    cy.visit(`${baseUrl}/auth/signup`);
    cy.get("#username").type("admin");
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("admin");
    cy.get("#confirmPassword").type("admin23");

    cy.get(":button").should("be.enabled");
    cy.contains("Register").click();
    cy.get("#notification");
  });
});
