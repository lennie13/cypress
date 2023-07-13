describe('Self-Service Knowledge Item Search', () => {

    beforeEach(function () {
        cy.session('init', () => {
            cy.loginSS()
        })
    })


    it('should be able to search for knowledge items', () => {

        cy.visit('https://challenger.marval.co.uk/MSMSelfService/KnowledgeBase.aspx')

        //Check has right title
        cy.get('.knowledgeBase')
            .should('contain', 'Knowledge Items')

        //Check are prompted to enter something
        cy.get('#ctl00_content_search').click()
        cy.get('#ctl00_content_searchTextValidator')
            .should('be.visible')
            .should('contain', 'Please specify search text.')

        //Check what happens if enter something that doesn't return anything
        cy.get('#ctl00_content_searchText')
            .should('be.visible')
                .type('asdfasgqwetqewfasdgfsadfas')
        cy.get('#ctl00_content_search').click()
        cy.get('#ctl00_content_knowledgeBaseSearchResults_noKnowledgeBaseSearchResultsMessage')
            .should('be.visible')
            .should('contain', 'Your search did not match any knowledge.')

        //Search with valid text with only 1 match
        cy.get('#ctl00_content_searchText').type('007')
        cy.get('#ctl00_content_search').click()
        cy.get('.number > a')
            .should('contain', 'ADST-1817')
            .should("have.attr", "href", 'ViewKnownError.aspx?knownErrorId=1794')
        cy.get('.description > a')
            .should('contain', 'QA do not delete S.007')
            .should("have.attr", "href", 'ViewKnownError.aspx?knownErrorId=1794&searchString=007&requestTypeId=0&serviceId=0')
        cy.get('tbody > tr > .source')
            .should('contain', 'Known Error')

        //Verify expected links are present
        cy.get('.viewOpenRequests > a')
            .should('contain', 'View Open Requests')
            .should("have.attr", "href", 'RequestList.aspx')
            .should('be.visible')
        cy.get('.iconList > .raiseNewRequest > a')
            .should('contain', 'Raise A New Request')
            .should("have.attr", "href", 'NewRequest.aspx?description=007')
            .should('be.visible')

        //test number of results - error if more than 20
        cy.get('#ctl00_content_numberOfResults').type('200')
        cy.get('#ctl00_content_search').click()
        cy.get('#ctl00_content_numberOfResultsValidator')
            .should('be.visible')
            .should('contain','Please specify a value between 1 and 20.')
        
        //Test number of results - errror if enter text
        cy.get('#ctl00_content_numberOfResults').type('some text')
        cy.get('#ctl00_content_search').click()
        cy.get('#ctl00_content_numberOfResultsFormatValidator')
            .should('be.visible')
            .should('contain','Please enter a numerical value.')

        //test number of results - error if more than 20
        cy.get('#ctl00_content_searchText').clear().type('test')
        cy.get('#ctl00_content_numberOfResults').clear().type('20')
        cy.get('#ctl00_content_search').click()
        cy.get('#ctl00_content_knowledgeBaseSearchResultsHeading')
            .should('be.visible')
            .should('contain','Search Results for "test"')
        cy.get(':nth-child(20) > .number > a')
            .should('be.visible')
        
    })

})