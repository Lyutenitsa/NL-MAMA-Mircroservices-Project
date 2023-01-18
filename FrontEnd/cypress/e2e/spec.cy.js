beforeEach(() => {
  // eslint-disable-next-line no-undef
  cy.visit("http://localhost:3000/");
})


describe('Checking the `btn` ', () => {
  it('btn', () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/articles");

    // eslint-disable-next-line no-undef
    cy.get('.btn')
        .click()
  })
})