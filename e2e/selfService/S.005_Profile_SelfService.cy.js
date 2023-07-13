describe('Self-Service Profile Options', () => {
  
    beforeEach(function(){
        cy.session('init', () => {
            cy.loginSS()
        })
    })
    
       
    it('should see correct details for account used in profile for name, email, groups and Location', () => {
      
        cy.goHome_SS();
        cy.get('[aria-label="My Details Pop Up"]').click()

        cy.fixture("login_Credentials.json").then((login) => {
            cy.get('#ctl00_profileDefinitionList > :nth-child(2)').should('contain',login.name)
            cy.get('#ctl00_profileDefinitionList > :nth-child(4)').should('contain',login.email)
            cy.get('.group').should('contain',login.group)
            cy.get('#ctl00_profileDefinitionList > :nth-child(8)').should('contain',login.location)
        })

    })


    it('should on Two-Factor Autentication be able to verify QR code is present and get error if use invalid security code used', () => {
      
        cy.goHome_SS();
        cy.get('[aria-label="My Details Pop Up"]').click()

        //go to two factor authentication page
        cy.get('.twoFactorAuthentication').click()
        cy.url().should('include','MSMSelfService/TwoFactorAuthentication.aspx')

        //QR code test
        cy.get('#ctl00_content_qrCode').should('exist')
        cy.get('#ctl00_content_securityCode').type("junk")
        cy.get('#ctl00_content_enableButton').click()
        cy.get('#ctl00_content_correctSecurityCodeValidator').should('contain','The security code is invalid')

    })


    it('should get suitable validation messages and then be able to reset password and log in using new password', () => {
        
        cy.goHome_SS();

        cy.fixture("login_Credentials.json").then((login) => {
            //go to reset password page
            cy.get('[aria-label="My Details Pop Up"]').click()
            cy.get('.resetPassword').click()
            cy.url().should('include','MSMSelfService/ResetPassword.aspx')

            //Submit with nothing populated
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_newPasswordValidator').should('contain','A new password is required.')
            cy.get('#ctl00_content_confirmNewPasswordVallidator').should('contain','Please confirm your new password.')

            //New Passwords match but no current password entered
            cy.get('#ctl00_content_newPassword').type('qwerty')
            cy.get('#ctl00_content_confirmNewPassword').type('qwerty')
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_currentPasswordInvalid').should('contain','The specified password is invalid.')

            //Reuse same password (need to reset the page to reset validation)
            cy.get('[aria-label="My Details Pop Up"]').click()
            cy.get('.resetPassword').click()    
            cy.get('#ctl00_content_currentPassword').type(login.password)
            cy.get('#ctl00_content_newPassword').type(login.password)
            cy.get('#ctl00_content_confirmNewPassword').type(login.password)
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_newPasswordSecurityValidator').should('contain','Cannot re-use a password from the last 1 passwords')

            
            //reset password
            cy.get('#ctl00_content_currentPassword').type(login.password)
            cy.get('#ctl00_content_newPassword').type('5555')
            cy.get('#ctl00_content_confirmNewPassword').type('5555')
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_passwordResetMessage').should('contain','Your password was reset')

            //log out
            cy.get('[aria-label="My Details Pop Up"]').click()
            cy.get('.logOut').click()
            cy.get('#ctl00_header_greeting').should('not.exist')

            //log in using reset password
            cy.get('#username').type(login.username)
            cy.get('#password').type('5555')  
            cy.get('#logIn').click()
            cy.get('#ctl00_header_greeting', { timeout: 10000 }).should('contain', "Hi "+ login.givenName +"! How can we help?")

            //change first time as can't reset directly to the previous password
            cy.get('[aria-label="My Details Pop Up"]').click()
            cy.get('.resetPassword').click()
            cy.get('#ctl00_content_currentPassword').type('5555')
            cy.get('#ctl00_content_confirmNewPassword').type('4444')     
            cy.get('#ctl00_content_newPassword').type('4444')
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_passwordResetMessage').should('contain','Your password was reset')

            //reset to password stored in config file
            cy.get('#ctl00_content_currentPassword').type('4444')
            cy.get('#ctl00_content_newPassword').type('3333')
            cy.get('#ctl00_content_confirmNewPassword').type('3333')
            cy.get('#ctl00_content_changePassword').click()
            cy.get('#ctl00_content_passwordResetMessage').should('contain','Your password was reset')
        })

    })
  
  })