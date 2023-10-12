describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user1 = {
      name: "admin",
      email: "admin@admin.com",
      password: "admin123",
    };

    console.log(Cypress.env("BACKEND"));

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);

    cy.visit("");
  });

  it("front can be visited", () => {
    cy.contains("Blogs");
  });

  describe.only("logged in actions", function () {
    beforeEach(function () {
      cy.login({ email: "admin@admin.com", password: "admin123" }).then(() => {
        cy.contains("Create a blog").click();
      });
    });

    it("checks blog form open by default", function () {
      cy.contains("Create a new blog");
    });

    it("opens new blog form and creates new blog", function () {
      cy.createBlog({
        title: "blog generated automatically with Cypress",
        url: "https://myblog.com.au",
      });

      cy.contains("blog generated automatically");
    });

    it("likes new blog", function () {
      cy.createBlog({
        title: "blog generated automatically with Cypress",
        url: "https://myblog.com.au",
      });

      cy.get("#viewButton").click();

      cy.get("#likeButton").click();
      cy.contains("Likes: 1");
    });

    it("opens the blog details and deletes it", function () {
      cy.createBlog({
        title: "blog generated automatically with Cypress",
        url: "https://myblog.com.au",
      });

      cy.contains("blog generated automatically");

      cy.contains("View").click();
      cy.get("#blogInfo");

      cy.contains("Delete").click();
      cy.contains("View").should("not.exist");
    });

    it("checks only the owner can delete the blog", function () {
      cy.signup({
        name: "Constanza",
        username: "coni",
        password: "coni123",
      }).then((res) => {
        cy.login({
          username: "coni",
          password: "coni123",
        });
        cy.createBlog({
          title: "not all users can delete all blogs",
          url: "http://notauthorized.to.delete.com",
        }).then((res) => {
          cy.get("#logout").click();
          cy.login({
            username: "admin",
            password: "admin123",
          });
          cy.get("#viewButton").click();
          cy.get("#deleteButton").should("not.exist");
        });
      });
    });
  });

  it("login fails with wrong credentials", function () {
    cy.login({ username: "admin", password: "weqwef" }).as("login");

    cy.get("@login").its("status").should("eq", 401);
  });

  it.only("sorting by likes", async function () {
    cy.login({ username: "admin", password: "admin123" });
    cy.createBlog({
      title: "first blog",
      url: "firsturl",
    });
    cy.createBlog({
      title: "second blog",
      url: "secondurl",
    });
    cy.createBlog({
      title: "third blog",
      url: "thirdurl",
    });

    cy.get(".blog").eq(0).find("button").click();
    cy.get(".blog").eq(1).find("button").click();
    cy.get(".blog").eq(2).find("button").click();
    cy.get("[data-cy='blogInfo']").eq(2).find("#likeButton").click();
    cy.wait(100);
    cy.get("[data-cy='blogInfo']")
      .find("#likes")
      .contains("Likes: 1")
      .parent()
      .find("#likeButton")
      .click();
    cy.wait(100);
    cy.get("[data-cy='blogInfo']")
      .find("#likes")
      .contains("Likes: 2")
      .parent()
      .find("#likeButton")
      .click();
    cy.wait(100);
    cy.get("[data-cy='blogInfo']")
      .find("#likes")
      .contains("Likes: 3")
      .parent()
      .find("#likeButton")
      .click();
    cy.wait(100);
    cy.get("[data-cy='blogInfo']")
      .contains("firsturl")
      .parent()
      .find("#likeButton")
      .click();
    cy.wait(100);
  });
});
