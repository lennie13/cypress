import 'cypress-file-upload';

describe('MSM Requests Razor Notifications', () => {

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginMSM()
        })
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    })


    it.only('verify can view razor text translated in messages', () => {

        cy.goHome_MSM()

             


  //      cy.get('[href="/MSM/RFP/Forms/Request.aspx?type=34"]')

        cy.createRequestMinFields()

    })


    it.skip('trigger razor notification and verify fields populated in audit', () => {

        cy.goHome_MSM()

        //this assumes there is already an action message to use

        //set up a rule to trigger this

        //create basic ticket

        //add field to trigger the rule

        //verify in right bottom panel rule triggered

        //verify in audit message contains text

    })


})