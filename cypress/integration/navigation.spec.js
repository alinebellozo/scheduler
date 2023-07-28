describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // visit the root of the web server
    cy.visit("/");
    // find the list item for the correct day and click it
    // cy.get("li").contains("Tuesday").click();
    // // confirm that the list item element that contains the text "Tuesday" is selected
    // cy.contains("li", "Tuesday")
    //   .should("have.css", "background-color", "rgb(242, 242, 242)");

    // refactor to use a single command chain that finds the list item, clicks it and checks it for the correct background color
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  })
});
