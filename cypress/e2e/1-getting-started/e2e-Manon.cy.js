/// <reference types="cypress" />

describe("test to do list", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:3000/");
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("alert when new task is empty", () => {
    cy.get('[data-cy="submit"]').click();
    cy.get('.alert-empty')
    .should('be.visible')
  })
  it('alert when adding already existing task', () => {
    const newItem ="Feed the cat";
    cy.get("[data-test=new-todo]").type(`${newItem}`);
    cy.get('[data-cy="submit"]').click();
    cy.get("[data-test=new-todo]").type(`${newItem}`);
    cy.get('[data-cy="submit"]').click();
    cy.get('.alert-empty')
    .should('be.visible')
  })
  it("can add new tasks", () => {
    const newItem = "Take a nap";
    const newItem3 = "Take a shower";

    cy.get('.alert-empty')
    .should('not.exist')

    cy.get("[data-test=new-todo]").type(`${newItem}`);
    cy.get('[data-cy="submit"]').click();
    cy.get("[data-test=new-todo]").type(`${newItem3}`);
    cy.get('[data-cy="submit"]').click();

    cy.get(".tasks-list")
      .children()
      .should("have.length", 3)
      .last()
      .should("have.text", newItem3 + "🗑️");
    cy.get(".pending-count").should("have.text", "3 Pending tasks");
  });
  it("can delete one task (not completed)", () => {
    cy.contains("Take a shower").parent().find("p[class=bin]").click();
    cy.get(".tasks-list")
      .children()
      .should("have.length", 2)
      .last()
      .should("have.text", "Take a nap🗑️");
  });

  it("can mark items as completed", () => {
    cy.contains("Feed the ").click();
    cy.contains("Feed the ").should(
      "have.css",
      "textDecoration",
      "line-through solid rgb(112, 128, 144)"
    );
  });
  it("has right pending and completed tasks", () => {
    cy.get(".pending-count").should("have.text", "1 Pending task");
    cy.get(".completed-count").should("have.text", "1 Completed task")
  });

  context("with a completed task", () => {
    it("can delete completed tasks", () => {
      cy.contains("Clear completed tasks").click();
      cy.get(".tasks-list").children().should("have.length", 1);
    });

    it("can delete all tasks", () => {
      cy.contains("Clear all tasks").click();
      cy.get(".tasks-list").children().should("have.length", 0);
    });
  });
});
