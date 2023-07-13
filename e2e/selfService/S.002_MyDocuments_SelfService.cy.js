describe('Self-Service My Documents', () => {

  //Test assumes user's account will have file public file 'ui_automation_tester_personal_file.docx' and private file 'ui_automation_tester_private_file.doc'
  //Test assumes user's OU will have file public file 'test_pdf.pdf' and private file 'cb.jpg'

  beforeEach(function(){

    cy.session('init', () => {
      cy.loginSS()
    })
  })
  
 
  it('can see own and OU public documents and cannot see own and OU private documents', () => {
  
    cy.goHome_SS();

    // Can get to My Documents
    cy.get('.myDocuments > a').click()
    cy.get('.section').contains("My Documents")
 
    //Can see own public documents
    cy.get(':nth-child(1) > .normal > a').should('contain',"ui_automation_tester_personal_file.docx")
  
    //does not see own private documents
    cy.get('#aspnetForm').contains("ui_automation_tester_private_file.doc").should('not.exist')

    //Can see OU public documents
    cy.get(':nth-child(2) > .normal > a').should('contain',"test_pdf.pdf")

    //Does not see OU private documents
    cy.get('#aspnetForm').contains("cb.jpg").should('not.exist')

  })

})