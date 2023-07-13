/* Note this assumes a survey will already be in place
    There is an action rule in challenger to set survey 'QA Survey for S.013 DO NOT DELETE' to UI Tester
       when a new request for service QA_regression2 is set
*/

describe('Self-Service My Surveys', () => {
  
    beforeEach(function(){
        cy.session('init', () => {
            cy.loginSS()
        })
    })
    
       
    it('check occurs in survey for mandatory fields', () => {
      
        cy.goHome_SS();
        cy.get('.mySurveys > a')
            .click()
        cy.get(':nth-child(1) > .name > a')
            .click()

        //try to submit
        cy.get('#ctl00_content_submitSurveyInstanceButton')
            .click()
        cy.get('#textBoxRequireValidator1_38')
            .scrollIntoView()
                .should('be.visible')
                .should('contain','This question is mandatory')
    })

    it.skip('can save survey', () => {
      
        cy.goHome_SS();
        cy.get('.mySurveys > a')
            .click()
        cy.get(':nth-child(1) > .name > a')
            .click()

        //get URL
        
        cy.get('#ctl00_content_questionControlRepeater_ctl01_surveyQuestion_textBox')
            .type('12')
        cy.get('#ctl00_content_saveSurveyInstanceButton')
            .click()
         
        //go back to survey list page and check table shows progress as part of survey is saved
        cy.get('.mySurveys > a')
            .click()


        //Answered one question but counts as 2 because of hidden question
        cy.get(':nth-child(1) > .questionsCompleted')
            .should('contain','2/13')
        cy.get(':nth-child(1) > .mandatoryQuestionsCompleted')
            .should('contain','1/4')
        cy.get(':nth-child(1) > .percentage')
            .should('contain','25%')
    })


    it('verify fields are checking for correct type of validation', () => {
      
        cy.goHome_SS();
        cy.get('.mySurveys > a')
            .click()
        cy.get(':nth-child(1) > .name > a')
            .click()

        //Enter the text
        cy.get('#ctl00_content_questionControlRepeater_ctl01_surveyQuestion_textBox')
            .type('aaa')
        cy.get('#ctl00_content_questionControlRepeater_ctl02_surveyQuestion_textBox')
            .type('ddd')
        cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_date')
            .type('aa')
        cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_time')
            .click()
            .type('bb',{force: true})
        cy.get('#ctl00_content_questionControlRepeater_ctl00_surveyQuestion_textBox')
            .click() //to change focus

        //check the validation messages
        cy.get('#ctl00_content_questionControlRepeater_ctl01_surveyQuestion_textBoxValidator')
            .should('be.visible')
            .should('contain','Please enter a valid integer value.')

         cy.get('#ctl00_content_questionControlRepeater_ctl02_surveyQuestion_textBoxValidator')
             .should('be.visible')
             .should('have.text','Please enter a valid real number.')
        

        cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_compareDateValidator')
            .should('be.visible')
            .should('have.text','Enter a valid  date.')

        cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_regexpTimeValidator')
            .should('be.visible')
            .should('have.text','Enter a valid  time.')

    })
    

    it('verify hint text displays correctly', () => {
      
        cy.goHome_SS();
        cy.get('.mySurveys > a')
            .click()
        cy.get(':nth-child(1) > .name > a')
            .click()

        cy.get('#ctl00_content_questionControlRepeater_ctl00_surveyQuestion_questionHintImage')
            .should('be.visible')
            .should('have.attr','title','Hint for string string field')
    })


    it('verify dependent survey questions display', () => {
      
        cy.goHome_SS();
        cy.get('.mySurveys > a')
            .click()
        cy.get(':nth-child(1) > .name > a')
            .click()

        //Choose option for question with dependent based on choice and check right field appears
        cy.get('#ctl00_content_questionControlRepeater_ctl06_surveyQuestion_dropdownList')
            .select('Option 1')
                .then(($btw) => {})
                    cy.get('#ctl00_content_questionControlRepeater_ctl06_questionDependencyControlRepeater_ctl00_surveyDependentQuestion_multilineTextBox')
                        .should('be.visible')
                
        //If change option choice a different field should appear
        cy.get('#ctl00_content_questionControlRepeater_ctl06_surveyQuestion_dropdownList')
            .select('Option 2')
                .then(($btw) => {})
                    cy.get('#ctl00_content_questionControlRepeater_ctl06_questionDependencyControlRepeater_ctl01_surveyDependentQuestion_textBox')
                        .should('be.visible')

        //If change option choice a different field then no extra field should appear
        cy.get('#ctl00_content_questionControlRepeater_ctl06_surveyQuestion_dropdownList')
            .select('Option 3')
                .then(($btw) => {})
                    cy.get('#ctl00_content_questionControlRepeater_ctl06_questionDependencyControlRepeater_ctl01_surveyDependentQuestion_textBox')
                        .should('not.be.visible')

        })


        it('verify can complete and submit a survey', () => {
      
            cy.goHome_SS();
            cy.get('.mySurveys > a')
                .click()

            //find how many surveys before complete
            cy.get('[class="restyled"]')
                .find("tr")
                .then((row) => {
                  //row.length will give you the row count
                  const numbSurveys = row.length;
                  cy.log(numbSurveys)
                });
             
                
            //go to page to complete the survey
            cy.get(':nth-child(1) > .name > a')
                .click()
    
            //fill in all fields
            cy.get('#ctl00_content_questionControlRepeater_ctl00_surveyQuestion_textBox') //string string
                .clear()
                    .type("txt box field completed by automation")

            cy.get('#ctl00_content_questionControlRepeater_ctl01_surveyQuestion_textBox')  //string integer
                .clear()
                    .type("123")  
                    
            cy.get('#ctl00_content_questionControlRepeater_ctl02_surveyQuestion_textBox') //string decimal
                .clear()
                    .type("3.45")  
    
            cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_date') //string date
                .clear()
                    .type("22/06/2023")  
            cy.get('#ctl00_content_questionControlRepeater_ctl03_surveyQuestion_dateTimePicker_time')
                .clear()
                    .type("09:12")  
            
            cy.get('#ctl00_content_questionControlRepeater_ctl04_surveyQuestion_textBox') //string url
                .clear()
                    .type("file.docx")  

            cy.get('#ctl00_content_questionControlRepeater_ctl06_surveyQuestion_dropdownList') //drop down
                .select("Option 3")
            
            cy.get('#checkBoxList8_26 > tbody > :nth-child(1) > td') //checkbox
                .click()

            cy.get('#ctl00_content_questionControlRepeater_ctl08_surveyQuestion_radioButtonList_2') //radio button
                .click()

            cy.get('#ctl00_content_questionControlRepeater_ctl09_surveyQuestion_textBox')//decimal text box
                .clear()
                    .type("5.67")
            
            cy.get('#ctl00_content_questionControlRepeater_ctl10_surveyQuestion_textBox') //integer text box
                .clear()
                    .type("789")

            cy.get('#ctl00_content_questionControlRepeater_ctl11_surveyQuestion_textBox') //text box
                .clear()
                    .type("some text added by automation")

            cy.get('#ctl00_content_questionControlRepeater_ctl12_surveyQuestion_textBox')
                .clear()
                    .type("12th September")
            
            //submit
            cy.get('#ctl00_content_submitSurveyInstanceButton')
                .click()

            //assert page is now survey list
            cy.url().should('include', 'MSMSelfService/SurveyList.aspx') 
          

            //assert now one less survey to complete
            // cy.get('[class="restyled"]')
            //     .find("tr")
            //         .then((row) => {
            //             let newlength = row.length
            //             cy.wrap(newlength).should('eq', numbSurveys -1); 
            // });


    })
})