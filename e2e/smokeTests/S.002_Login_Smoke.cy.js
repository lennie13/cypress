describe('MSM Login and Logout', () => {

    beforeEach(function () {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });

        cy.fixture("login_Credentials.json").then((login) => {
            cy.visit(login.urlMSM)
        });
    })


    it('can navigate to the login page and return link is included', () => {

        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .should('be.visible')
        cy.get('#ctl00_editionImage')
            .should('be.visible')
    })


    it('verify azure login button is present and has right link', () => {
        //cannot test clicking it as Cypress doesn't allow redirect to other domains and clicking the button redirects to microsoft authentication domain

        cy.get('.Azure-AD > a')
            .should('be.visible')
        cy.get('.Azure-AD > a')
            .should('have.attr', 'href')
            .and('include', 'servicedesk.marval.co.uk:443/MSMAuthenticationAzure/Account/SignIn')   
    })


    it('can navigate to forgotten password page and request password', () => {

        //go to forgotten password page
        cy.get('#ctl00_cpf_forgotMyPassword')
            .click()
        
        //verify on right page
        cy.url()
            .should('include','ResetPassword.aspx')
        cy.get('h1')
            .should('contain','Reset password')
        cy.get('#ctl00_cpm_resetMessage')
            .should('contain','To reset your password')

        //verify username field changes colour if press request reset and no username supplied
        cy.get('#ctl00_cph_sendPasswordReset')
            .click()
        cy.get('#ctl00_cph_username')
            .should('have.attr', 'class')
            .and('include', 'username required text invalid') 

        //request username
        cy.get('#ctl00_cph_username')
            .type('junkusername')
        cy.get('#ctl00_cph_sendPasswordReset')
            .click()
        cy.get('#ctl00_errorMessage')
            .should('be.visible')
            .should('contain','If the username is valid, a password reset email will shortly be sent to you.')

        //return to main login screen using back to button
        cy.get('#ctl00_cpf_backToLogin')
            .click()
        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .should('be.visible')
        
    })


    it('verify no or invalid username or password', () => {
    
        //no username
        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .click()
        cy.get(id)
            .should('have.attr', 'class')
            .and('include', 'required text invalid') 

        //no password
        cy.get('#ctl00_cph_username')
            .type('someusername')
        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .click()
        cy.get('#ctl00_errorMessage')
            .should('be.visible')
            .should('contain','Incorrect Username or Password.')

        //reload and test wrong password
        cy.fixture("login_Credentials.json").then((login) => {
            cy.visit(login.urlMSM)
        });
        cy.get('#ctl00_cph_username')
            .type('someusername')
        cy.get('#ctl00_cph_password')
            .type('wrongpassword')
        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .click()
        cy.get('#ctl00_errorMessage')
            .should('be.visible')
            .should('contain','Incorrect Username or Password.')

    })


    it('can toggle to view password', () => {
    
        //when first type password details should be obscured
        cy.get('#ctl00_cph_password')
            .type('wrongpassword')
        cy.get('#ctl00_cph_password')
            .should('have.attr', 'type')
            .and('include', 'password') 
        
        //toggle password and check now text (i.e. visible)
        cy.get('#ctl00_cph_togglePassword')
            .click()
        cy.get('#ctl00_cph_password')
            .should('have.attr', 'type')
            .and('include', 'text') 

        //toggle password and check now password again (i.e. not visible)
        cy.get('#ctl00_cph_togglePassword')
            .click()
        cy.get('#ctl00_cph_password')
            .should('have.attr', 'type')
            .and('include', 'password') 
  
    })


    it('can log in and then out', () => {
    
        //log in
        cy.loginMSM()

        //log out
        cy.get('[href="/MSM/RFP/Forms/Logon.aspx?logOff=true"]')
            .should('have.text','Log Out')
                .click({ force: true })
        cy.get('#ctl00_cph_logOn_fakeApplyButton')
            .should('be.visible')

    })

})