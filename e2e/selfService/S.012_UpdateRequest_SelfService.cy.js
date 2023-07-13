import 'cypress-file-upload';

describe('Self-Service Update Request', () => {

    //NB These tests assume System Settings > Secure Text Editor tab is Enabled. The Id of the text box changes otherwise and the tests fail

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginSS()
        })
    })


    it('should be able to update request in self-service', () => {

        //Create ticket to use
        cy.SS_createRequest_minimum('QA_service SS_Regression', 'Test SS Update Request')

        //Enter update
        const uniqueSeed = Date.now().toString();
        const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
        const uniqueId = getUniqueId();
        cy.get('#ctl00_content_note_squireTextEditor_editor')
            .type("SS Automated Update Request " + uniqueId)
        cy.get('#ctl00_content_notificationAddress')
            .clear()
            .type('newemail@test.com' + uniqueId)
        cy.get('#ctl00_content_thirdPartyReference')
            .clear()
            .type('Updated contact ' + uniqueId)
        cy.get('input[name="ctl00$content$newSSAttachment"]')
            .attachFile('testJPG.jpg',);

        //Test reset (notes doees't get cleared)
        cy.get('[type="reset"]')
            .click()
        cy.get('.attachmentFileNames > div')
            .should('not.exist')
        cy.get('#ctl00_content_notificationAddress')
            .should('not.include.text', 'newemail@test.com' + uniqueId)
        cy.get('#ctl00_content_thirdPartyReference')
            .should('not.include.text', 'Updated contact ' + uniqueId)

        //Re-enter data and submit
        cy.get('#ctl00_content_note_squireTextEditor_editor')
                .clear()
                    .type("SS Automated Update Request " + uniqueId)
        cy.get('#ctl00_content_notificationAddress')
                .clear()
                    .type('newemail@test.com' + uniqueId)
        cy.get('#ctl00_content_thirdPartyReference')
                .clear()
                    .type('Updated contact ' + uniqueId)
        cy.get('input[name="ctl00$content$newSSAttachment"]')
                .attachFile('testJPG.jpg',);
        cy.get('#ctl00_content_updateRequestButton')
                .click()

        //Verify the update has happened
        cy.get('.notes')
            .should('contain',"SS Automated Update Request " + uniqueId)
         cy.get('#ctl00_content_notificationAddress')
             .should('have.value', 'newemail@test.com' + uniqueId)
        cy.get('#ctl00_content_thirdPartyReference')
            .should('have.value', 'Updated contact ' + uniqueId)
        cy.get('#ctl00_content_existingAttachments')
          .should('contain', 'testJPG.jpg')

    })

})