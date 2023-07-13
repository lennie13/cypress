import 'cypress-file-upload';

describe('Self-Service Approvals', () => {

    beforeEach(function () {

        cy.fixture("login_Credentials.json").then((login) => {
            cy.visit(login.urlSS)
        });
    })


    it('can approve request in self-service', () => {

        // log in
        cy.fixture("login_Credentials.json").then((login) => {
            cy.visit(login.urlSS)
            cy.get('#username').type(login.username)
            cy.get('#password').type(login.password)
            cy.get('#logIn').click()
            cy.get('#ctl00_header_greeting', { timeout: 10000 }).should('contain', "Hi " + login.givenName + "! How can we help?")
        });

        //go to approvals page
        cy.get('.myPendingApprovals > a')
            .click()
        cy.get('#ctl00_content_heading')
            .should('contain', 'Pending Approvals')

        //Click to access record to approve
        cy.get(':nth-child(2) > .number > a')
            .click()

        //Fill in form
        cy.get('#ctl00_content_decisionState')
            .select('Rejected')
        cy.get('#ctl00_content_approveOnBehalfOf')
            .select('Yourself')
        cy.get('#ctl00_content_decisionReason')
            .type('something')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testJPG.jpg',);
        cy.get('.attachmentFileNames > div') //verify file has attached
            .should('contain', 'testJPG.jpg')

        //test resest
        cy.get('[type="reset"]')
            .click()
        cy.get('#ctl00_content_decisionState')
            .should('have.value', '0')
        cy.get('#ctl00_content_decisionReason')
            .should('have.value', '')
        cy.get('.attachmentFileNames > div')
            .should('not.exist')

        //Fill in form
        cy.get('#ctl00_content_decisionState')
            .select('Approved')
        cy.get('#ctl00_content_approveOnBehalfOf')
            .select('Yourself')
        cy.get('#ctl00_content_decisionReason')
            .type('some reason to approve, added via API')
        cy.get('[id="ctl00_content_newSSAttachment"]')
            .attachFile('testJPG.jpg',);
        cy.get('.attachmentFileNames > div') //verify file has attached
            .should('contain', 'testJPG.jpg')

        //get ticket working on, submit and check this ticket is no longer in approvals list
        cy.get('#ctl00_content_requestNumber').then(($req) => {

            // store refernce of request working on
            const reqNumb = $req.text()

            //Submit
            cy.get('#ctl00_content_updateRequestButton')
                .click()

            //Verify page has changed
            cy.url()
                .should('include', 'MSMSelfService/ApprovalList.aspx')
                .should('not.include', 'MSMSelfService/ViewApproval.aspx')

            //Verify request Id has disappeared from list of things needing approval
            cy.get('#aspnetForm')
                .should('not.contain', reqNumb)

        })

    })


})