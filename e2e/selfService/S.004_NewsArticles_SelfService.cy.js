describe('Self-Service News Articles', () => {
  
    beforeEach(function(){
        cy.session('init', () => {
            cy.loginSS()
        })
    })
    
       
    it('should be able to view newsarticle on front page, visit the full news articles page expand and collapse article and visit the next and previous page', () => {
      
        cy.goHome_SS();

        // heading is present
        cy.get('a[href="NewsArticles.aspx"]').should('contain','Latest News')

        //article displays relevant sections
        cy.get('article > h2').should('be.visible')
        cy.get('h3').should('be.visible')

        //can click on more news and expand an article
        cy.get('.moreNews').click()
        cy.url().should('include','MSMSelfService/NewsArticles.aspx')
        cy.get('h1').should('contain','News Articles')
        cy.get('#ctl00_content_list > :nth-child(1) > :nth-child(3)').should('contain','Read More').click()
        cy.get('#ctl00_content_list > :nth-child(1) > :nth-child(3)').should('contain','Collapse')

        //can go to the next page
        cy.get('#ctl00_content_nextPage').click()
        cy.url().should('include','MSMSelfService/NewsArticles.aspx?page=2')

        //can go back to the previous page (page 1)
        cy.get('#ctl00_content_previousPage').click()
        cy.url().should('not.contain','page=2')
    })

})