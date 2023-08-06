Cypress.Commands.add("signup", ({ name, username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
    name,
    username,
    password,
  }).then((res) => {
    localStorage.setItem("userBlogApp", JSON.stringify(res.body));
    cy.visit("");
  });
});
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username: username,
    password: password,
  }).then((res) => {
    localStorage.setItem("userBlogApp", JSON.stringify(res.body));
    cy.visit("");
    console.log(localStorage.getItem("userBlogApp"));
  });
});

Cypress.Commands.add("createBlog", ({ title, url }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: {
      title,
      url,
    },
    headers: {
      "Authorization": `Bearer ${
        JSON.parse(localStorage.getItem("userBlogApp")).token
      }`,
    },
  });
  cy.visit("");
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
