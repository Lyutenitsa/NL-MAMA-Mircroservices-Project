beforeEach(() => {
  // eslint-disable-next-line no-undef
  cy.visit("http://localhost:3000/login");
})

describe('Checking the username input', () => {
  it('login input', () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/login");
    // eslint-disable-next-line no-undef
    cy.get(':nth-child(1) > .form-control')
        .type('username')
  })
})
describe('Checking the password input', () => {
  it('login input', () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/login");
    // eslint-disable-next-line no-undef
    cy.get(':nth-child(2) > .form-control')
        .type('password')
  })
})

describe('Checking the `btn` ', () => {
  it('btn', () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/login");
    cy.get(':nth-child(1) > .form-control')
        .type('username')
    cy.get(':nth-child(2) > .form-control')
        .type('password')
    cy.get('.mr-3').contains('Login').click() // Click on first el containing 'Welcome'

    cy.url().should('include', '/homescreen')

  })
})