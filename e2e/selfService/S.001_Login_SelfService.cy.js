describe('Self-Service Login', () => {

  beforeEach(function(){
  
    cy.fixture("login_Credentials.json").then((login) => {
      cy.visit(login.urlSS)
    });
  })
  
 
  it('can navigate to Self-Service Login page', () => {

    cy.url().should('include','MSMSelfService/Login.aspx');
    cy.get('#logIn').should('be.visible')
  
  })


  it('can request forgotten password', () => {
      
    //Can get to forggoten password page
    cy.get('#forgotPassword').click()

    //Gets error if click when nothing present
    cy.get('#sendPasswordReset').click()
    cy.get('#usernameRequiredValidator').contains("Please Specify username.")

    //Gets message if enters username and clicks send button
    cy.get('#username').type("junkUsername") //as don't want to trigger a reset
    cy.get('#sendPasswordReset').click()
    cy.get('#success').contains("A password reset link has been sent to the email address associated with this username.")

    //Can return to the main page
    cy.get('a').click()
    cy.get('#logIn').should('be.visible')

  })


  it('should get validation for invalid credentials', () => {
    
    //submit when blank
    cy.get('#logIn').click() //submit when blank
    cy.get('#error').contains("Incorrect username or password.")

    //submit when invalid credentials
    cy.get('#username').click().type("fakeUsername")
    cy.get('#password').click().type("xxxxx")  
    cy.get('#logIn').click() 
    cy.get('#error').contains("Incorrect username or password.")

  })


  it('should be able to log in with valid credentials and then log out', () => {
      
    //can log in
    cy.fixture("login_Credentials.json").then((login) => {
      cy.get('#username').type(login.username)
      cy.get('#password').type(login.password)  
   
      cy.get('#logIn').click()
      cy.get('#ctl00_header_greeting', { timeout: 10000 }).should('contain', "Hi "+ login.givenName +"! How can we help?")
    });

    //can log out
    cy.get('[class="myAccount"]').click()
    cy.get('.logOut').click()
    cy.get('#logIn').should('be.visible')

  })

})