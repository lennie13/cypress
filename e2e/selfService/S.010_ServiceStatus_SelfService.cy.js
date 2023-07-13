describe('Self-Service Service Status', () => {

    //This assumes the user has access to services QA_regression2 & QA_service SS_Regression and both remain in state they were when test was created

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginSS()
        })      
    })


    it('should be able to access service status page and view history of services', () => {

        cy.visit('https://challenger.marval.co.uk/MSMSelfService/ServiceStatus.aspx')

        cy.get('.serviceStatus')
            .should('be.visible')
            .should('contain','Service Status')

        //Verify service with no maintenance messages
        cy.get('a[onclick*="QA_service SS_Regression"]')
                .click()
        cy.get('#ctl00_content_noIssues > .status_Ok')
            .should('be.visible')
            .should('contain','There are no current issues reported for this service.')
       
        //Verify service which is under maintenance's details
        cy.get('a[onclick*="QA_regression2"]')
                .click()
        cy.get('#details_0 > .currentStatus')
            .should('be.visible')
            .should('contain','Under Maintenance')
        cy.get('#details_0 > .wrap')   //this is service status notification description heading
            .should('be.visible')
            .should('contain','** Service under Maintenance **')
        cy.get('#details_0 > :nth-child(3) > .value')  //this is service name
            .should('be.visible')
            .should('contain','QA_regression2')
        cy.get('#details_0 > :nth-child(4) > .value') //this is end time
            .should('be.visible')
            .should('contain','Ongoing')        
        cy.get('#details_0 > :nth-child(5) > .value') //this is start time
            .should('be.visible')
            .should('contain','22/05/2023 16:15:40')
        cy.get('#details_0 > :nth-child(6) > .value > :nth-child(1)')//this is description line 1
            .should('be.visible')
            .should('contain','This is being used for self-service regression test')
        cy.get('img')
            .should('be.visible')

        //verify service which is under maintenance's history
        cy.get('#History_1 > .serviceHistoryItem')
            .should('be.visible')
            .should('contain','22/05/2023 16:12:06 - Degraded')

        //verify can click link in history and view that item's history
        cy.get('#History_1 > .serviceHistoryItem')
                .click()
        cy.get('#details_1 > .currentStatus')
            .should('be.visible')
            .should('contain','Degraded')

    })

})