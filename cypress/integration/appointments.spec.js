describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  
  it("should book an interview", () => {
    // test that clicks the add button for the empty appointment
    // we use first because there are two Add buttons, we hide the second one because it is part of the last appointment, which we only want to display the header with the time
    cy.get("[alt=Add]").first().click();

    // type the name "Lydia Miller-Jones" into the student input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // select the interviewer with the name "Sylvia Palmer"
    cy.get('[alt="Sylvia Palmer"]').click();

    // click the save button
    cy.contains("Save").click();

    // verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    // click the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });

    // click the confirm button
    cy.contains("Confirm").click();

    // check that the "Deleting" indicator should exist
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // check that the .appointment__card--show element that contains the text "Archie Cohen" should not exist
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
})