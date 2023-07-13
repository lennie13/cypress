describe('Self-Service Quick Search', () => {
  
    beforeEach(function(){
        cy.session('init', () => {
            cy.loginSS()
        })
    })
    
       
    it('should be able to quick search for a specific request, get back results and click on links', () => {
      
        //Search for a request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('INC-45101')

        //View Requests header and check can follow the header link
        cy.get('li[aria-label="My Requests Link"]').should('contain','My Requests').click()
        cy.url().should('include','MSMSelfService/RequestList.aspx?description=INC-45101')

        //Search for a request again and check get back the expected request and can click link to specific request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('INC-45101')
        cy.get('a[title="INC-45101 QA pls leave rpowoalkailk S006"]').should('contain','INC-45101 QA pls leave rpowoalkailk S006').click()
        cy.url().should('include','MSMSelfService/ViewRequest.aspx?requestId=45098')
    
    })
    

    it('should be able to quick search for a pending approvals, get back results and click on links', () => {
      
        //Search for a request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('INC-44946')

        //View Requests header and check can follow the header link
        cy.get('li[aria-label="My Pending Approvals Link"]').should('contain','My Pending Approvals').click()
        cy.url().should('include','MSMSelfService/ApprovalList.aspx')

        //Search for a request again and check get back the expected request and can click link to specific request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('INC-44946')
        cy.get('a[title="INC-44946 QA do not delete or approve used for S.007"]').should('contain','INC-44946 QA do not delete or approve used for S.007').click()
        cy.url().should('include','MSMSelfService/ViewApproval.aspx?requestId=44943&type=1')
    
    })


    it('should be able to quick search for a KI, get back results and click on links', () => {
      
        //Search for a KI
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('ADST-1817')

        //View KI header and check can follow the header link
        cy.get('li[aria-label="Knowledge Items Link"]').should('contain','Knowledge Items').click()
        cy.url().should('include','MSMSelfService/KnowledgeBase.aspx?numberOfResults=10&searchText=ADST-1817')

        //Search for a KI again and check get back the expected KI and can click link to specific request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('ADST-1817')
        cy.get('a[title="ADST-1817 QA do not delete S.007"]').should('contain','ADST-1817 QA do not delete S.007').click()
        cy.url().should('include','MSMSelfService/ViewKnownError.aspx?knownErrorId=1794')
    
    })


    it('should be able to quick search for a News article, get back results and click on links', () => {
      
        //Search for a News Article
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('qa news item with photo')

        //View Requests header and check can follow the header link
        cy.get('li[aria-label="News / Announcements Link"]').should('contain','News / Announcements').click()
        cy.url().should('include','MSMSelfService/NewsArticles.aspx')

        //Search for a news article again and check get back the expected news article and can click link to specific request
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('qa news item with photo')
        cy.get('a[title="QA News item with photo"]').should('contain','QA News item with photo').click()
        cy.url().should('include','MSMSelfService/NewsArticles.aspx?fetchSize=1&page=1')
    
    })


    it('should be able to quick search for a service, get back results and click on links', () => {
      
        //Search for a service catalogue
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('QA_service SS_Regression')

        //View service catalogue header and check can follow the header link
        cy.get('li[aria-label="Service Catalogue Items Link"]').should('contain','Service Catalogue Items').click()
        cy.url().should('include','MSMSelfService/ServiceCatalogueEx.aspx')

        //Search for a service catalgoue again and check get back the expected form 
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('QA_service SS_Regression')
        cy.get('a[title="QA_service SS_Regression - QA Test Page"]').should('contain','QA_service SS_Regression - QA Test Page').click()
        cy.url().should('include','MSMSelfService/AutoGen.aspx?page=174')
    
    })


    it('should return no links when matches nothing', () => {
      
        //Search for a News Article
        cy.goHome_SS();
        cy.get('#ctl00_header_searchTextAdv').click().type('asdflkjwtkjwlj;alsdfjlja;sdfasf')

        cy.get('li[aria-label="No results Link"]').should('have.length', 5);

    })

})