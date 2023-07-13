describe('Self-Service Knowledge Base', () => {

    //Test assumes user has section 'knowledge base' set in Self Service Customisation Sections
  
    beforeEach(function(){
        cy.session('init', () => {
            cy.loginSS()
        })
    })
    
   
    it('should see heading for Highest Rated, Featured and Most Viewed on page 1 of Knowledge Base', () => {
      
        cy.goHome_SS();

        //user sees heading for Knowledge Base
        cy.get('#ctl00_content_knowledgeBase > :nth-child(1) > h1').should('contain','Knowledge Base')

        // there is a heading for Highest Rated in the Knoweldge Base page 1 and it contains just one item
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(1) > h2').should('contain','Highest Rated')
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(1) > .mostView > li > a').should('exist')
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(1) > .mostView > :nth-child(2) > a').should('not.exist')

        //there is a heading for Featured in the Knowledge Base page 1
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(2) > h2').should('contain','Featured')
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(2) > .mostView > :nth-child(1) > a').should('exist');

        //there is a heading for Most Viewed in the Knowledge Base page 1
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(3) > h2').should('contain','Most Viewed')
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(3) > .mostView > :nth-child(1) > a').should('exist');

    })


    it('should see heading for Latest and Most Rated on page 2 of Knowledge Base', () => {
      
        cy.goHome_SS();

        //user can go to page 2 of Knowledge Base
        cy.get('#ctl00_content_knowledgeBasePager > :nth-child(2) > a').click()
        

        // there is a heading for Latest in the Knoweldge Base page 2
        cy.get('#ctl00_content_knowledgeBasePage2 > :nth-child(1) > h2').should('contain','Latest')
        cy.get('#ctl00_content_knowledgeBasePage2 > :nth-child(1) > .mostView > :nth-child(1) > a').should('exist');

        //there is a heading for Most Rated in the Knowledge Base page 2
        cy.get('#ctl00_content_knowledgeBasePage2 > :nth-child(2) > h2').should('contain','Most Rated')
        cy.get('#ctl00_content_knowledgeBasePage2 > :nth-child(2) > .mostView > :nth-child(1) > a').should('exist');

        //user can go back to page 1 of Knowledge Base
        cy.get('#ctl00_content_knowledgeBasePager > :nth-child(1) > a').click()
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(1) > .mostView > li > a').should('exist')
    })


    it('verify user can click a KI link in Knowledge Base and KI opens successfully', () => {
        
        cy.goHome_SS();
        cy.get('#ctl00_content_knowledgeBasePage1 > :nth-child(1) > .mostView > li > a').click();
        cy.url().should('include','MSMSelfService/ViewKnownError.aspx?knownErrorId=');
      
    })
  
  })