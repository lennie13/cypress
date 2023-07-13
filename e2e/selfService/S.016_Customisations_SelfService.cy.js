/*** For the user in this test UI-Automation customisation has been set to :
   - Change submit buttons to have an orange (rather than blue) background
     Change the accessible link 
*/

describe('Self-Service Customisations', () => {

  beforeEach(function () {

    cy.fixture("login_Credentials.json").then((login) => {
      cy.visit(login.urlSS)
    });
  })


  it('customisation for user to change colour of submit button is working', () => {

    //Verify colour of a button when not logged in (so the customisation is not in action)
    cy.get('#logIn')
      .should('have.css', 'background-color', 'rgb(0, 0, 255)')

    // log in
    cy.fixture("login_Credentials.json").then((login) => {
      cy.get('#username').type(login.username)
      cy.get('#password').type(login.password)
      cy.get('#logIn').click()
      cy.get('#ctl00_header_greeting', { timeout: 10000 }).should('contain', "Hi " + login.givenName + "! How can we help?")
    });

    //go to page where have a submit button
    cy.get('.myRequests > a')
      .click()

    //query a button once logged in to check the customised CSS is working
    cy.get('#ctl00_content_refresh')
      .should('have.css', 'background-color', 'rgb(255, 165, 0)')


  })

  it('accessibility link is displaying and correct', () => {

    //can log in
    cy.fixture("login_Credentials.json").then((login) => {
      cy.get('#username').type(login.username)
      cy.get('#password').type(login.password)

      cy.get('#logIn').click()
      cy.get('#ctl00_header_greeting', { timeout: 10000 })
        .should('contain', "Hi " + login.givenName + "! How can we help?")
    });

    cy.get('#ctl00_accessibilityURL')
      .should('be.visible')
      .should('have.attr', 'href')
      .should('contain', 'http://www.marval.co.uk/accessibility')

  })


})