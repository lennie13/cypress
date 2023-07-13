import 'cypress-file-upload';

describe('Self-Service Raise New Request', () => {

    //NB These tests assume System Settings > Secure Text Editor tab is Enabled. The Id of the text box changes otherwise and the tests fail

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginSS()
        })
    })


    it('should be able to raise new request in self-service', () => {

        //go to the page
        cy.goHome_SS();
        cy.get('.raiseNewRequest > a')
            .click()

        //Check heading present
        cy.get('.raiseNewRequest > a')
            .should('contain', 'New Request')

        //Check knowledge items and help on page
        cy.get('#ctl00_content_knowledgeBase > .knowledgeBase')
            .scrollIntoView()
            .should('be.visible')
        cy.get('#ctl00_content_mostCommonKnowledgeBase > .knowledgeBase')
            .scrollIntoView()
            .should('be.visible')
        cy.get('#tooltipContent > .none > h2') //help present
            .scrollIntoView()
            .should('be.visible')
            .should('contain', 'Help')
        cy.get('.description > .information') //checking one bit of help
            .should('be.visible')
            .should('contain', 'Please provide a short overview of your issue.')

        //Check validation if try to submit a blank form
        cy.get('#visibleRaiseRequest').click()
        cy.get('#ctl00_content_serviceValidator')
            .should('be.visible')
            .should('contain', 'Please select a service.')
        cy.get('#ctl00_content_descriptionValidator')
            .should('be.visible')
            .should('contain', 'Please specify a description.')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testPNG.png',); //ie change the file
        cy.get('#ctl00_content_AttachmentTypeValidator')
            .should('contain', 'One or more attachments did not match the file types allowed.')

        //Verify help text disappears when field is populated (testing against description)
        cy.get('#ctl00_content_description')
            .type('SS Automated Request')
        cy.get('.description > .information') 
            .should('not.be.visible')

        //Enter data to use in testing clear button
        cy.get('[id="ctl00_content_service"]')
            .select('QA_service SS_Regression')
        cy.get('#ctl00_content_description')
            .clear()
            .type('SS Automated Request')
        cy.get('#ctl00_content_spokeToName')
            .type('Person Spoke To')
        cy.get('#ctl00_content_location_locations')
            .type('Bexleyheath')
        cy.get('#ctl00_content_notificationAddress')
            .type('test@test.com')
        cy.get('#ctl00_content_thirdPartyReference')
            .type('third party reference details')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testJPG.jpg',);

        //Check can clear the form (NB Notes field and email are not cleared using this button)
        cy.get('[type="reset"]').click()
        cy.get('[id="ctl00_content_service"]')
            .should('have.value', '')
        cy.get('#ctl00_content_description')
            .should('have.value', '')
        cy.get('#ctl00_content_spokeToName')
            .should('have.value', '')
        cy.get('#ctl00_content_location_locations')
            .should('have.value', '')
        cy.get('#ctl00_content_thirdPartyReference')
            .should('have.value', '')
        cy.get('.attachmentFileNames > div')
            .should('not.exist')

        //Reenter values
        cy.get('[id="ctl00_content_service"]')
            .select('QA_regression2')
 
        const dayjs = require('dayjs')
        cy.get('#ctl00_content_description')
            .type("SS Automated Request " + dayjs().format('DD/MM/YYYY'))

        cy.get('#ctl00_content_spokeToName')
            .type('Person Spoke To')
   
        //set location
        cy.get('#ctl00_content_location_locations')
            .clear()
            .type('bex')
        cy.get('#ui-id-1')
            .click()

        cy.get('#ctl00_content_note_squireTextEditor_editor')
            .type('This is a request raised by self-service automation')
        cy.get('#ctl00_content_notificationAddress')
            .clear()
            .type('test@test.com')
        cy.get('#ctl00_content_thirdPartyReference')
            .type('third party reference details')

        //file upload, inlcuding verifying can only have 1 attachment)
        cy.get('#ctl00_content_attachmentButton')
            .should('be.visible')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testPNG.png',);
        cy.get('.attachmentFileNames > div')
            .should('contain', 'testPNG.png')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testJPG.jpg',); //ie change the file
        cy.get('.attachmentFileNames > div')
            .should('contain', 'testJPG.jpg') //ie verify the file has changed

        //Checklists
        cy.get('#ctl00_content_checklistPicker') //change choice of checklist
            .select('SS011 Checklist1')
        cy.get('#ctl00_content_checklistContent')
            .should('contain', 'Service QA_regression2 Checklist ONE for testing')
        cy.get('#ctl00_content_checklistPicker') //change choice of checklist
            .select('SS011 Checklist2')
        cy.get('#ctl00_content_checklistContent')
            .should('contain'.at, 'Service QA_regression2 Checklist TWO for testing')

        //Submit
        cy.get('#visibleRaiseRequest')
            .click()

        //Verify the request has been raised
        cy.get('#ctl00_content_requestNumber')
            .should('contain', "SS Automated Request " + dayjs().format('DD/MM/YYYY'))
        cy.get('.text > div')
            .should('contain', 'This is a request raised by self-service automation')
        cy.get('.attachment > a')
            .should('contain', 'testJPG.jpg')
        cy.get('.description > .controls')
            .should('contain', "SS Automated Request " + dayjs().format('DD/MM/YYYY'))
        cy.get('.status > .controls')
            .should('contain', 'New') //set by rule
        cy.get('.location > .controls')
            .should('contain', 'Bexleyheath')
        cy.get('.service > .controls')
            .should('contain', 'QA_regression2')
        cy.get('#ctl00_content_spoketo > .controls')
            .should('contain', 'Person Spoke To')

        //Verify update form is present on page
        cy.get('fieldset > .request')
            .should('be.visible')
        cy.get('#ctl00_content_note_squireTextEditor_editor')
            .should('be.visible')
        cy.get('#ctl00_content_updateRequestButton')
            .should('be.visible')

    })

})