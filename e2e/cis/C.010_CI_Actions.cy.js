describe('MSM Confirmation Items Actions', () => {

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginMSM()
        })
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    })


    it('Can create, update, delete, delete from recycle bin', () => {

        cy.goHome_MSM()

        //go to page
        cy.get('[href="/MSM/RFP/Forms/MenuPage.aspx?titleResourceKey=CONFIGURATION_ITEM_MAINTENANCE_TITLE"]')
            .should('have.text', 'Configuration Item')
            .click({ force: true })
        cy.get('[title="Configuration Item Actions"]')
            .click()
        cy.get('#ctl00_ctl00_ctl00_cph_title')
            .should('contain', 'Configuration Item Actions')
        cy.url()
            .should('contain', 'ConfigurationItemActions.aspx')

        // *** Create new rule ****
        //Add new item
        cy.get('#ctl00_ctl00_ctl00_quickMenu_add')
            .click()

        //enter distinct title
        const dayjs = require('dayjs')
        var title = "Automation Action " + dayjs().format('DD/MM/YYYY HH:mm')
        cy.get('#ctl00_ctl00_cph_ruleEditor_name')
            .type(title)

        //add predicate
        cy.get('.group > .predicate > .add')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor_name')
            .select('Name')
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor_Operator')
            .select('Equals')
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor__Name_textBox')
            .type('someText')

        //add rule action and submit
        cy.get('#ctl00_ctl00_cph_ruleEditor_tabStrip > .tabPageHeaders > ul > :nth-child(2) > a')
            .should('have.text', 'Then')
            .click()
        cy.get('.ruleAction > .add')
            .click({ force: true })
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_name')
            .select('Post to URL')
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_GenerateLink_urlTextBox_name')
            .type('https://someurl.com')
       
        cy.wait(5000)  //could not work out why but had to do this otherwise the button was clicked but action didn't happen  
        cy.get('#ctl00_ctl00_cph_apply_fakeApplyButton')
                .scrollIntoView()
                .invoke('show')
                .click({ force: true })
    
        //verify action has been created
        cy.url()
            .should('contain', 'id')

        //go back to page with all the actions on it
        cy.log("log:"+69)
        cy.get('[title="Back To Previous Page"]')
            .click()

        //verify can filter and find new rule
        cy.get('#ctl00_ctl00_ctl00_cph_filterTextBox_textBox')
            .type(title)
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_tabStrip')
            .should('contain', title)
            .should('contain', 'Active')

        //***Can update the rule  ***
        //Find the rule
        // cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_activeRules').within(() => {
        //     cy.get('[style="transition: background-color 1.5s ease 0s;"]').within(() => { //all rules display on page but hidden hence had to use the class for the active rule
        //         cy.get('[title="View"]')
        //             .click()
        //     })
        // })
        cy.wait(3000)
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_activeRules').within(() => {
            cy.get('[class="scroll"]').within(() => {
                cy.get('div').each(($item, index) => {
                    if (Cypress.dom.isVisible($item)) {
                    //    $item[0].querySelector('[title="View"]')
                    //        .click()
                    cy.log("something")
                    }
                })
            })
        })

        //change title
        var updatedtitle = "Automation updated " + dayjs().format('DD/MM/YYYY HH:mm')
        cy.get('#ctl00_ctl00_cph_ruleEditor_name')
            .clear()
            .type(updatedtitle)

        //can add 2nd predicate and then remove it
        cy.get('.predicate.add > .add')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor_name')
            .should('be.visible')
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor_editableMemberPredicate > .delete')
            .should('be.visible')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_predicateEditor_name')
            .should('not.be.visible')

        //can add and delete second rule
        cy.get('#ctl00_ctl00_cph_ruleEditor_tabStrip > .tabPageHeaders > ul > :nth-child(2) > a')
            .click()
        cy.get('.ruleAction.add > .add')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_name')
            .should('be.visible')
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_editableRuleAction > .delete')
            .should('be.visible')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_name')
            .should('not.be.visible')

        //can edit original rule
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_ruleActionsContainer > .summary > .edit')
            .click()
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_GenerateLink_urlTextBox_name')
            .clear()
            .type('https://adifferenturl.com')

        //submit changes
        cy.wait(5000)  //could not work out why but had to do this otherwise the button was clicked but action didn't happen
        cy.get('#ctl00_ctl00_cph_apply_fakeApplyButton')
            .scrollIntoView()
            .invoke('show')
            .click({ force: true })
        cy.get('#ctl00_ctl00_cph_ruleEditor_ruleActionsEditor_GenerateLink_urlTextBox_name')
            .should('not.visible')

        //go back to page with all the actions on it
        cy.get('[title="Back To Previous Page"]')
            .click()

        cy.get('#ctl00_ctl00_ctl00_cph_filterTextBox_textBox')
            .type(updatedtitle)
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_tabStrip')
            .should('not.contain', title)
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_tabStrip')
            .should('contain', updatedtitle)

        cy.get('[value="Edit"]')
            .click({ force: true })

        // *** Delete the rule ***
        //can delete new rule
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_activeRules').within(() => {
            cy.get('[style="transition: background-color 1.5s ease 0s;"]').within(() => { //all rules display on page but hidden hence had to use the class for the active rule
                cy.get('[title="Delete"]')
                    .click()
            })
        })
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_tabStrip')
            .should('not.contain', updatedtitle)
        cy.get('#ctl00_ctl00_ctl00_cph_apply')
            .click()

        //go to recycle bin
        cy.get('#ctl00_ctl00_ctl00_quickMenu_recycleBin')
            .click()
        //find item to delete
        cy.get('#ctl00_ctl00_cph_filterContentPlaceHolder_filterText')
            .type(updatedtitle)
        cy.get('#ctl00_ctl00_cph_apply')
            .click()

        //delete item
        cy.get('#ctl00_ctl00_cph_grid_body > .row > .checkbox > input') //as only have 1 entry back
            .click()
        cy.get('#ctl00_ctl00_quickMenu_delete')
            .click()
        cy.get('[identifier="1"]')
            .click()
        cy.get('#ctl00_ctl00_cph_grid_body')
            .should('not.contain', updatedtitle)

    })


    it.skip('Can use the test engine to check a rule works', () => {

        cy.goHome_MSM()

        //go to page
        cy.get('[href="/MSM/RFP/Forms/MenuPage.aspx?titleResourceKey=CONFIGURATION_ITEM_MAINTENANCE_TITLE"]')
            .should('have.text', 'Configuration Item')
            .click({ force: true })
        cy.get('[title="Configuration Item Actions"]')
            .click()

        cy.get('[name="ctl00$ctl00$ctl00$cph$test"]')
            .click({ force: true })

        //set criteria
        cy.get('#ctl00_ctl00_ctl00_cph_testCriteriaPlaceHolder_isNew')
            .uncheck() //so not is new
        cy.get('#ctl00_ctl00_ctl00_cph_testCriteriaPlaceHolder_tabStrip > .tabPageHeaders > ul > :nth-child(2) > a')
            .click({ force: true })
        cy.get('#ctl00_ctl00_ctl00_cph_testCriteriaPlaceHolder_previousName')
            .invoke('show')
            .type('qa test for c010', { force: true })

        //execute & verify
        cy.get('#ctl00_ctl00_ctl00_cph_executeTest')
            .click()
        cy.get('#ctl00_ctl00_ctl00_cph_ruleSetEditor_activeRules')
            .should('be.visible', 'QA CI Rule DO NOT DELETE C.010')

        //Change criteria and verify rule now not returned
        cy.get('[name="ctl00$ctl00$ctl00$cph$executeTest"]')
            .should('have.value', 'Change Criteria')
            .click()
        cy.get('#ctl00_ctl00_ctl00_cph_testCriteriaPlaceHolder_previousName')
            .clear()
            .type('xxqa test for c010f', { force: true })
        cy.get('#ctl00_ctl00_ctl00_cph_executeTest')
            .click()
        cy.contains('QA CI Rule DO NOT DELETE C.010', { force: true })
            .should('not.be.visible')
    })


    

})