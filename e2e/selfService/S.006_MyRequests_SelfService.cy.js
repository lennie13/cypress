describe('Self-Service My Requests', () => {

    //Test assumes user's account will have file public file 'ui_automation_tester_personal_file.docx' and private file 'ui_automation_tester_private_file.doc'
    //Test assumes user's OU will have file public file 'test_pdf.pdf' and private file 'cb.jpg'

    beforeEach(function () {

        cy.session('init', () => {
            cy.loginSS()
        })
    })


    it('should on My Requests see links to Knowledge Items Search and Raise A New Request', () => {

        cy.goHome_SS();
        cy.get('.myRequests > a').click()

        cy.get('#ctl00_content_heading').should('contain', 'Requests')
        cy.url().should('include', 'MSMSelfService/RequestList.aspx')

        cy.get('#ctl00_content_knowledgeBaseLink > a').should('be.visible')
        cy.get('#ctl00_content_help > .iconList > :nth-child(2) > a').should('be.visible')

    })


    it('verify can search by Number field for valid and invalid value and details returned for known ticket are correct', () => {

        cy.goHome_SS();
        cy.get('.myRequests > a').click()

        //search for invalid Number
        cy.get('#ctl00_content_number').type("not a number")
        cy.get('#ctl00_content_refresh').click()
        cy.get('#ctl00_content_numberRegularExpressionValidator').should('contain', 'Please enter a valid number')

        //search for valid Number
        cy.get('#ctl00_content_number').clear().type("45101")
        cy.get('#ctl00_content_refresh').click()
        cy.get('[id="requests"]').should('contain', 'INC-45101')

        //Repeat with a different value and check no longer see INC-45101
        cy.get('#ctl00_content_number').clear().type("45070")
        cy.get('#ctl00_content_refresh').click()
        cy.get('[id="requests"]').should('not.have.text', 'INC-45101')

        //Verify known data returned for a request
        cy.get('.number > a').should('contain', 'INC-45070')
        cy.get('.description > a').should('contain', 'test property enforcement for forced CI')
        cy.get('tbody > tr > .contact').should('contain', 'Tester, UI Automation')
        cy.get('tbody > tr > .status').should('contain', 'New')
        cy.get('tbody > tr > .lastUpdated').should('contain', '20/01/2023 by Tester, UI Automation')

    })


    it('verify can search by Description field and include custome requests and include closed requests works', () => {

        cy.goHome_SS();
        cy.get('.myRequests > a').click()

        // searches by Description field'
        cy.get('#ctl00_content_number').clear()
        cy.get('#ctl00_content_description').type('rpowoalkailk')
        cy.get('#ctl00_content_refresh').click()
        cy.get('.number > a').should('contain', 'INC-45101')

        //check what happens if nothing found
        cy.get('#ctl00_content_description').clear().type('eryehewgwertw')
        cy.get('#ctl00_content_refresh').click()
        cy.get('#ctl00_content_noRequestsMessage').should('contain', 'No Requests')

        //user ticks include customer request
        //check not there before tick 'Include Customer Requests'
        cy.get('#ctl00_content_description').clear().type('forced')
        cy.get('#ctl00_content_refresh').click()
        cy.get('[id="requests"]').should('not.have.text', 'PRB-45368')

        //check is there when have ticked 'Include Customer Requests'
        cy.get('#ctl00_content_includeCustomerRequests').check()
        cy.get('#ctl00_content_refresh').click()
        cy.get('[id="requests"]').should('contain', 'PRB-45368')

        //user tickets include closed requests 
        //Check closed request not already present
        cy.get('[id="requests"]').should('not.have.text', 'INC-45105')

        //Check if select to include closed requests is there now
        cy.get('#ctl00_content_includeClosedRequests').check()
        cy.get('#ctl00_content_refresh').click()
        cy.get('[id="requests"]').should('contain', 'INC-45105')
    })


    it('verify can search by Dates and appropriate validation is shown if invalid', () => {

        cy.goHome_SS();
        cy.get('.myRequests > a').click()
        cy.get('#ctl00_content_requestAction').select('Closed')

        //No match
        cy.searchRequestsByDate_SS('25/04/2023', '00:01', '26/04/2023', '23:00')
        cy.get('#ctl00_content_noRequestsMessage').should('contain', 'No Requests')

        //Check if Low Date field changes can then see results
        cy.searchRequestsByDate_SS('24/04/2023', '00:01', '26/04/2023', '23:00')
        cy.get('#requests').contains('INC-45105').should('exist')

        //Check if Low Time altered there are then no results
        cy.searchRequestsByDate_SS('24/04/2023', '19:00', '26/04/2023', '23:00')
        cy.get('#ctl00_content_noRequestsMessage').should('contain', 'No Requests')

        //Check if High Time field altered will then again see results
        cy.searchRequestsByDate_SS('24/04/2023', '00:01', '24/04/2023', '19:00')
        cy.get('#requests').contains('INC-45105').should('exist')

        //Check if High Date field altered (and low time) can then see results
        cy.searchRequestsByDate_SS('24/04/2023', '00:01', '24/04/2023', '02:00')
        cy.get('#ctl00_content_noRequestsMessage').should('contain', 'No Requests')

        //Enter text in Date Before
        cy.get('#ctl00_content_lowDate_date').type('a')
        cy.get('#ctl00_content_lowDate_time').click()
        cy.get('#ctl00_content_lowDate_compareDateValidator').should('contain', 'Enter a valid From date.')

        cy.get('#ctl00_content_lowDate_date').clear()
        cy.get('#ctl00_content_lowDate_time').type('a')
        cy.get('#ctl00_content_lowDate_date').click()
        cy.get('#ctl00_content_lowDate_regexpTimeValidator').should('contain', 'Enter a valid From time.')

        cy.get('#ctl00_content_lowDate_time').clear()
        cy.get('#ctl00_content_highDate_date').type('a')
        cy.get('#ctl00_content_lowDate_date').click()
        cy.get('#ctl00_content_highDate_compareDateValidator').should('contain', 'Enter a valid To date')

        cy.get('#ctl00_content_highDate_date').clear()
        cy.get('#ctl00_content_highDate_time').type('a')
        cy.get('#ctl00_content_lowDate_date').click()
        cy.get('#ctl00_content_highDate_regexpTimeValidator').should('contain', 'Enter a valid To time.')
        cy.get('#ctl00_content_highDate_time').clear()

        //No dates
        cy.get('#ctl00_content_refresh').click()
        cy.get('#ctl00_content_dateValidator').should('contain', 'Please specify a valid date range.')

    })


    it('should be able to sort by status descending', () => {

        cy.goHome_SS();
        cy.get('.myRequests > a').click()

        //set up so can do the test
        cy.get('#ctl00_content_requestAction').invoke('val', '')
        cy.get('#ctl00_content_requestAction').select('Closed')
        cy.get('#ctl00_content_includeClosedRequests').check()
        cy.get('#ctl00_content_includeCustomerRequests').check()
        cy.searchRequestsByDate_SS('24/04/2023', '00:01', '24/04/2023', '19:00')

        //Verify PRB-45368 not at top of list before you start
        cy.get('table').should('not.have.text', 'INC-45098')

        //put in desired settings
        cy.get('#sortColumn').select('Description')
        cy.get('#sortDirection').select('Descending')
        cy.get('table').find('tr').eq(1).contains('INC-45098')

    })

})