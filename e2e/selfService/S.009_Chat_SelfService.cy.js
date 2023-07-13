describe('Self-Service Chat (only cusomer side)', () => {

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginSS()
        })      
    })


    it('should be able to send chat message to agent', () => {

        cy.visit('https://challenger.marval.co.uk/MSMSelfService/Chat.aspx')

        //Verify chat appears
        cy.get('#discussion')
            .should('be.visible')
            .should('contain','Waiting for an agent to become available. You are number ')

        //Send chat request for help
        cy.get('#ctl00_content_service')
                .select('QA_service SS_Regression')
        cy.get('#description')
            .should('be.visible')
                .type('help me')
        cy.get('#setServiceAndDescForChat')
                .click()

        

        //Once clicked to start the chat
        cy.get('#discussion')
            .should('be.visible')
            .should('contain','Waiting for an agent to become available. You are number ')
        cy.get('#description')
            .should('be.not.visible')

        //End the chat
        cy.get('#finishLink')
            .should('be.visible')
                .click()
    })

})