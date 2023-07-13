describe('MSM Maintenace Action Message', () => {

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginMSM()
        })
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    })


    it.skip('create and delete new action messages', () => {

        cy.goHome_MSM()

        //go to page
        cy.get('[href="/MSM/RFP/Forms/MenuPage.aspx?titleResourceKey=REQUEST_MAINTENANCE_TITLE"]')
            .should('have.text', 'Request')
            .click({ force: true })
        cy.get('[title="Action Messages"]')
            .click()
        cy.get('#ctl00_ctl00_cph_entityHeaderText')
            .should('contain', 'New Action Message')
        cy.url()
            .should('contain', 'ActionMessage.aspx')

        //name and content should be mandatory
        cy.get('#ctl00_ctl00_cph_apply_fakeApplyButton')
            .click()
        cy.verifyFieldHasClass('#ctl00_ctl00_cph_maintenance_name_name', 'required text invalid')
        cy.verifyFieldHasClass('#ctl00_ctl00_cph_maintenance_content_TextArea', 'required invalid')

        //Enter details and check the mandatory colouring changes
        const dayjs = require('dayjs')
        var title = "Automation Created Action Message " + dayjs().format('DD/MM/YYYY HH:mm')
        cy.get('#ctl00_ctl00_cph_maintenance_name_name')
            .type(title)
        cy.get('#ctl00_ctl00_cph_maintenance_content_TextArea')
            .type('This is a test message for @Model.FullRequestNumber </p>\n<strong>Description:</strong> @Model.Description</p>\n')
        cy.get('#ctl00_ctl00_cph_maintenance_name_name')
            .click() //ie change focus so css updates
        cy.verifyFieldHasClass('#ctl00_ctl00_cph_maintenance_name_name', 'required text')
        cy.verifyFieldHasClass('#ctl00_ctl00_cph_maintenance_content_TextArea', 'required')

        //save and check new action message appears in filter box on left
        cy.get('#ctl00_ctl00_cph_apply_fakeApplyButton')
            .click()
        cy.get('#ctl00_ctl00_cph_existingEntitiesContentPlaceHolder_ExistingEntitiesList_filterTextBox_textBox')
            .type(title)
        cy.get('#ctl00_ctl00_cph_existingEntitiesContentPlaceHolder_ExistingEntitiesList_loadMoreList')
            .should('contain', title)

        //verify can delete
        cy.get('#ctl00_ctl00_quickMenu_delete')
            .click()
        cy.get('#ctl00_ctl00_cph_existingEntitiesContentPlaceHolder_ExistingEntitiesList_loadMoreList')
            .should('not.contain', title)

        //Verify cannot create duplicate entry
        cy.get('#ctl00_ctl00_quickMenu_new')
            .click()
        cy.get('#ctl00_ctl00_cph_maintenance_name_name')
            .type(title)
        cy.get('#ctl00_ctl00_cph_maintenance_name_message')
            .should('be.visible')
            .should('contain', 'not available')

        //tidy up (delete from recycle bin)
        cy.emptyTopOptionRecycleBin(title)

    })


    it.skip('action messages view parameters', () => {

        cy.goHome_MSM()

        //go to page
        cy.get('[href="/MSM/RFP/Forms/MenuPage.aspx?titleResourceKey=REQUEST_MAINTENANCE_TITLE"]')
            .click({ force: true })
        cy.get('[title="Action Messages"]')
            .click()
        cy.url()
            .should('contain', 'ActionMessage.aspx')

        cy.get('#ctl00_ctl00_quickMenu_razorTemplateParameters')
            .click()

        //  cy.get('#ctl00_ctl00_quickSearch_previewFrame')

        cy.get('[src="/MSM/RFP/Forms/RazorTemplateParameters.aspx"]')
            .its('0.contentDocument.body')
            .then(cy.wrap).invoke('val').find('[id="ctl00_cph_requestNo"]').type('x')


        //.find('#ctl00_cph_getParameters')

        // cy.fixture("msm.json").then((MSM) => {
        //     cy.get('#ctl00_cph_requestNo')
        //         .type(MSM.knownReqNumb1)
        //     cy.get('#ctl00_cph_getParameters')
        //         .click()
        //     cy.get('#ctl00_cph_templateParameters')
        //         .should('contain','@Model.RequestNumber')
        //         .should('contain', MSM.knownReqNumb1)
        // });

    })


    it.only('action messages can be previewed and razor is translated', () => {

        cy.goHome_MSM()

        //go to page
        cy.get('[href="/MSM/RFP/Forms/MenuPage.aspx?titleResourceKey=REQUEST_MAINTENANCE_TITLE"]')
            .click({ force: true })
        cy.get('[title="Action Messages"]')
            .click()
        cy.url()
            .should('contain', 'ActionMessage.aspx')

        //choose known message
        cy.contains('QA Action Msg DO NOT DELETE R.010')
            .click()

        //click to preview and verify known text is present
        cy.fixture("msm.json").then((MSM) => {
            cy.get('#ctl00_ctl00_cph_maintenance_requestNumber')
                .type(MSM.knownReqNumb1)
            cy.get('#ctl00_ctl00_cph_maintenance_preview')
                .click()

                cy.get('[src="/MSM/RFP/Forms/RazorTemplateParameters.aspx"]')
                .its('0.contentDocument.body')
                .then(cy.wrap).invoke('val').find('[id="ctl00_cph_requestNo"]').type('x')

            cy.get('[src="/MSM/RFP/Forms/RazorTemplateParameters.aspx"]')
            .its('0.contentDocument').should('exist')
                .should('contain','Request Parameters')
            // cy.get('#ctl00_ctl00_cph_maintenance_messageElement')
            //     .invoke('val')
            //         .should('contain', 'This is a test message for INC-39443 </p>\n\n<strong>Description:</strong> Default request description</p>\n\n<p><strong>Status:</strong> New<br />\n\n<strong>Priority:</strong> 1<br />\n\n<strong>Assignee:</strong> Administrator, System<br />')
        });

    })

})