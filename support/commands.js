// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//   
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('loginSS',() =>{
    cy.fixture("login_Credentials.json").then((login) => {
        cy.visit(login.urlSS)
        cy.get('#username').type(login.username)
        cy.get('#password').type(login.password)  
        cy.get('#logIn').click()
        cy.get('#ctl00_header_greeting', { timeout: 10000 }).should('contain', "Hi "+ login.givenName +"! How can we help?")
    })
})


Cypress.Commands.add('loginMSM',() =>{
    cy.fixture("login_Credentials.json").then((login) => {
        cy.visit(login.urlMSM)
        cy.get('#ctl00_cph_username').type(login.username)
        cy.get('#ctl00_cph_password').type(login.password)  
        cy.get('#ctl00_cph_logOn_fakeApplyButton').click()
        cy.get('[title="Quick Search"]').should('be.visible')
    })
})


Cypress.Commands.add('goHome_SS',() =>{
    cy.fixture("login_Credentials.json").then((login) => {
        cy.visit(login.urlSSHome)
   });
})


Cypress.Commands.add('SS_createRequest_minimum',(service, description) =>{
    cy.fixture("self-service.json").then((ss) => {
        cy.visit(ss.urlNewRequest)
    });
    cy.get('[id="ctl00_content_service"]')
        .select(service)
    cy.get('#ctl00_content_description')
        .type(description)
    cy.get('#visibleRaiseRequest')
        .click() 
})


Cypress.Commands.add('goHome_MSM',() =>{
    cy.fixture("login_Credentials.json").then((login) => {
        cy.visit(login.urlMSMHome)
   });
})


Cypress.Commands.add('searchRequestsByDate_SS',(dateLow,timeLow,dateHigh,timeHigh) =>{

    cy.get('#ctl00_content_lowDate_date').clear().type(dateLow)
    cy.get('#ctl00_content_lowDate_time').clear().type(timeLow)
    cy.get('#ctl00_content_highDate_date').clear().type(dateHigh)
    cy.get('#ctl00_content_highDate_time').clear().type(timeHigh)
    cy.get('#ctl00_content_refresh').click()

})


Cypress.Commands.add('verifyFieldHasClass',(id, className) =>{

    cy.get(id)
        .should('have.attr', 'class')
        .and('include', className) 

})


Cypress.Commands.add('emptyTopOptionRecycleBin',(itemName) =>{

    //go to recycle bin
    cy.get('#ctl00_ctl00_quickMenu_recycleBin')
        .click()

    //find item to delete
    cy.get('#ctl00_ctl00_cph_filterContentPlaceHolder_filterText')
        .type(itemName)
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
        .should('not.contain',itemName)
})


Cypress.Commands.add('createRequestMinFields',() =>{

    //go to form for QA_Min
    cy.get('[href="/MSM/RFP/Forms/Request.aspx?type=34"]')
        .click({force: true})

    cy.get('#ctl00_cph_customer_name')
        .type('Perf')
    cy.get('#ctl00_cph_contact_name')
        .type('Anderson, Fergus')
    cy.get('#ctl00_cph_service_selectedText')
        .type('QA_service SS_Regression')
    cy.get('#ctl00_cph_service_selectButton')
        .click()

    // cy.get('#ctl00_cph_description')
    //     .type('Automation created')

    // cy.get('#ctl00_cph_priority')
    //     .select('1')
    // cy.get('#ctl00_cph_impact')
    //     .select('2')
    // cy.get('#ctl00_cph_urgency')
    //     .select('3')

    // cy.get('#ctl00_cph_workflow_value')
    //     .select('QA Workflow 2 - please DO NOT DELETE')
    // cy.get('#ctl00_cph_workflowStatus_valueSelect')
    //     .select('New')

})   



//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })