describe('MSM pages load without error', () => {


        beforeEach(function () {

                cy.session('init', () => {
                        cy.loginMSM()
                })
        })

        const pages = [
                 "About.aspx"
                //  , "AccessGroup.aspx"
                //  , "AccessLevel.aspx"
                //  , "ActionMessage.aspx"
                //  , "ActivityAudits.aspx"
                //  , "ActivityMonitor.aspx"
                //  , "ActivityType.aspx"
                // , "AdHocCIList.aspx?pageTitle=My%20Bookmarked%20Configuration%20Items&gridName=bookmarkedConfigurationItems_206&predicateJson=%7b%22%24type%22%3a%22MarvalSoftware.Predicates.MemberPredicate%2c+MarvalSoftware%22%2c%22Name%22%3a%22ci_isBookmarkedBy%22%2c%22Type%22%3a1%2c%22Operator%22%3a0%2c%22Value%22%3a206%2c%22IsUnary%22%3afalse%2c%22IsNegated%22%3afalse%7d"
                // , "AdHocKnownErrorList.aspx?pageTitle=My%20Bookmarked%20Knowledge%20Items&gridName=bookmarkedKnownErrors_206&predicateJson=%7b%22%24type%22%3a%22MarvalSoftware.Predicates.MemberPredicate%2c+MarvalSoftware%22%2c%22Name%22%3a%22knownError_isBookmarkedBy%22%2c%22Type%22%3a1%2c%22Operator%22%3a0%2c%22Value%22%3a206%2c%22IsUnary%22%3afalse%2c%22IsNegated%22%3afalse%7d"
                // , "AdHocRequestList.aspx?pageTitle=My%20Bookmarked%20Requests&gridName=bookmarkedRequests_206&predicateJson=%7b%22%24type%22%3a%22MarvalSoftware.Predicates.MemberPredicate%2c+MarvalSoftware%22%2c%22Name%22%3a%22request_isBookmarkedBy%22%2c%22Type%22%3a1%2c%22Operator%22%3a0%2c%22Value%22%3a206%2c%22IsUnary%22%3afalse%2c%22IsNegated%22%3afalse%7d&suppressBackButton=true"
                // , "AdHocRequestTemplateList.aspx?popupInvokerId=__Page&popupSelectValuesMethodName=processCreateFromTemplateRequestWindowResults&pageTitle=TEMPLATE_REQUEST_SEARCH_TITLE&gridName=templateRequestSearch&isPopup=true&_requestType_requestTypeId=1"
                // , "AdHocServiceUsersList.aspx?pageTitle=SERVICE_USERS_PAGE_TITLE&_service_id=115"
                // , "AdHocServiceUserMembersList.aspx?pageTitle=CUSTOMER_MEMBERS_PAGE_TITLE&_customer_id=1"
                // , "AdHocThresholdRequestList.aspx?isPopup=true&gridName=thresholdAlerter&_isArchived=false&_isClosed=false&_tracker_id=5279"
                // , "AdvancedSearch.aspx"
                // , "AgreementException.aspx?id=28&ParentAgreementId=1&AgreementType=1"
                // , "AgreementRule.aspx"
                // , "AgreementRules.aspx"
                // , "ApiKeys.aspx"
                // , "AuditConfigurationItem.aspx"
                // , "AuditConfigurationItemOverview.aspx"
                , "AuditViewer.aspx"
                , "AutoStatus.aspx"
                , "BaseLineConfigurationItem.aspx"
                , "BreachMonitor.aspx"
                , "BreachReason.aspx"
                , "CalendarFeed.aspx"
                , "Calendars.aspx"
                , "ChangeFreeze.aspx"
                , "ChangeFreezeRule.aspx"
                , "ChangeFreezeRules.aspx"
                , "ChangeModel.aspx"
                , "ChargeType.aspx"
                , "CheckList.aspx"
                , "CIAdvancedSearch.aspx"
                , "CiAttributeSheet.aspx?pageTitle=CIATTRIBUTES_TITLE&isPopup=true&ignorePopupInvoker=true&_ciid=7728&predicateJson={%22$type%22:%22MarvalSoftware.Predicates.MemberPredicate,%20MarvalSoftware%22,%22Name%22:%22accessLevel_value%22,%22Type%22:%22Property%22,%22Operator%22:32768,%22Value%22:0}"
                , "CIAuditAddMoreCIs.aspx"
                , "CiCategory.aspx"
                , "CiCategoryAttribute.aspx"
                , "CiImageLibrarySelector.aspx"
                , "CiInsurance.aspx?pagetitle=CIINSURANCE_TITLE&gridName=ciInsuranceGrid&isPopup=true&ignorePopupInvoker=true&popupAllowsMultipleSelection=true&_ciid=7883"
                , "CiLicences.aspx?pagetitle=CILICENCES_TITLE&isPopup=true&gridName=ciLicenceGrid&ignorePopupInvoker=true&popupAllowsMultipleSelection=true&_ciid=7883"
                , "CIList.aspx?id=1146&newlist=true"
                , "CIRelationshipType.aspx"
                , "CISearch.aspx"
                , "CiTypeDefaults.aspx?ciTypeId=6&baseType=6&pageId=__Page&method=closeCiTypeDefaultsWindow"
                , "Classification.aspx?id=1"
                , "ClassificationGroup.aspx"
                , "ConcurrentLicence.aspx"
                , "ConfigDataManagement.aspx"
                , "Configuration.aspx"
                , "ConfigurationDiagram.aspx"
                , "ConfigurationDiagramViewer.aspx"
                , "ConfigurationItem.aspx"
                , "ConfigurationItemStatus.aspx"
                , "ConfigurationItemType.aspx"
                , "CostCentre.aspx"
                , "CostsManagement.aspx"
                , "CostsManagementRule.aspx"
                , "CostsManagementRules.aspx"
                , "Country.aspx"
                , "Cti.aspx"
                , "Currency.aspx"
                , "CustomCss.aspx"
                , "Customer.aspx?id=1"
                , "CustomerSearch.aspx"
                , "DatabaseMaintenance.aspx"
                , "Default.aspx"
                , "DeltaDataManagement.aspx"
                , "DepreciationMethod.aspx"
                , "Diagnostics.aspx"
                , "Dictionary.aspx"
                , "Directory.aspx"
                , "DiscoveryCommit.aspx"
                , "DiscoveryConfiguration.aspx"
                , "DiscoveryXml.aspx"
                , "ErrorControl.aspx"
                , "FinanceAddMoreCIs.aspx"
                , "FinanceOverview.aspx"
                , "FinanceRecord.aspx"
                , "FinancialStatus.aspx"
                , "HoldReason.aspx"
                , "Impact.aspx"
                , "ImpactChangeReason.aspx"
                , "InsuranceRecord.aspx"
                , "JobSheet.aspx"
                , "Keyword.aspx"
                , "KnowledgeItemType.aspx"
                , "KnownError.aspx"
                , "KnownErrorAdvancedSearch.aspx"
                , "KnownErrorList.aspx?id=1"
                , "LicenceAgreement.aspx"
                , "LicenceStatus.aspx"
                , "LicenceType.aspx"
                , "LinearWorkflowStage.aspx"
                , "List.aspx?id=1"
                , "Loan.aspx"
                , "Location.aspx"
                , "Logs.aspx"
                , "Mailbox.aspx"
                , "MailImportRule.aspx"
                , "MailImportRules.aspx"
                , "MaintenanceExistingEntitiesAdvancedFilter.aspx?name=~%2FRFP%2FForms%2FConfigurationItem.aspx&listSpecificationFileName=CIs.json&parentInvokerId=__Page&parentInvokerMethod=advancedFilterSaved"
                , "Make.aspx"
                , "ManualNotification.aspx?id=12798&NotificationCategory=Request&RelatedEntity=Request&pageId=__Page&method=hideManualNotifications"
                , "ManualSurveyGenerationRequest.aspx"
                , "MaterialPart.aspx"
                , "MenuPage.aspx?titleResourceKey=REQUEST_MAINTENANCE_TITLE"
                , "Model.aspx?id=1"
                , "NewsArticle.aspx"
                , "NotificationList.aspx"
                , "NotificationTemplate.aspx"
                , "OperationalLevelAgreement.aspx"
                , "OrganisationalStructure.aspx"
                , "OUAdvancedSearch.aspx"
                , "OUList.aspx?id=1"
                , "OutageOwnership.aspx"
                , "OutagesAdvancedSearch.aspx"
                , "OutagesList.aspx?id=1"
                , "OutageTarget.aspx?ciid=9400"
                , "OutageTargetAgreement.aspx"
                , "OutageType.aspx"
                , "PersonAvailability.aspx"
                , "PersonLicences.aspx?pagetitle=CILICENCES_TITLE&isPopup=true&gridName=ciLicenceGrid&ignorePopupInvoker=true&popupAllowsMultipleSelection=true&_ciid=206"
                , "PersonTitle.aspx"
                , "Plugin.aspx"
                , "Preferences.aspx"
                , "PrintRequest.aspx"
                , "Priority.aspx"
                , "PriorityChangeReason.aspx"
                , "ProductGroup.aspx"
                , "Profile.aspx"
                , "ProjectCode.aspx"
                , "PurchaseOrder.aspx"
                , "Question.aspx"
                , "QuestionGroup.aspx"
                , "QuestionType.aspx"
                , "RazorTemplateParameters.aspx"
                , "RecurringTemplateRequest.aspx"
                , "RecycleBin.aspx"
                , "RelationshipAnalyser.aspx"
                , "Reminders.aspx"
                , "RemoteConnectionTool.aspx"
                , "Reporting.aspx"
                , "Request.aspx"
                , "RequestAction.aspx"
                , "RequestActions.aspx"
                , "RequestAdvancedSearch.aspx"
                , "RequestAllocationFilter.aspx"
                , "RequestAllocationFilters.aspx"
                , "RequestAttributeType.aspx"
                , "RequestCheckListSelectionRule.aspx"
                , "RequestCheckListSelectionRules.aspx"
                , "RequestClassificationFilter.aspx"
                , "/RequestClassificationFilters.aspx?dictionaryId=1"
                , "RequestDefault.aspx"
                , "RequestDefaults.aspx"
                , "RequestEmailAuditViewer.aspx?id=1"
                , "RequestLayout.aspx"
                , "RequestList.aspx?id=1"
                , "RequestPropertyEnforcement.aspx"
                , "RequestPropertyEnforcements.aspx"
                , "RequestRedaction.aspx"
                , "RequestRequiredAttribute.aspx"
                , "RequestSearch.aspx"
                , "RequestSource.aspx"
                , "RequestTemplate.aspx"
                , "RequestType.aspx"
                , "Risk.aspx"
                , "Role.aspx"
                , "Satisfaction.aspx"
                , "SavedListAdvancedSearch.aspx"
                , "SavedListList.aspx?id=1"
                , "ScheduledChanges.aspx"
                , "ScheduledRedactions.aspx"
                , "ScriptMaintenance.aspx"
                , "Sector.aspx"
                , "SelfServiceCustomisation.aspx"
                , "SelfServiceEdit.aspx?id=172&service=9400"
                , "SelfServiceGrouping.aspx"
                , "SelfServiceLinks.aspx",
                , "Service.aspx"
                , "ServiceAdvancedSearch.aspx"
                , "ServiceAgreement.aspx"
                , "ServiceAttribute.aspx"
                , "ServiceCatalogueClass.aspx"
                , "ServiceCustomersEdit.aspx?serviceId=113&serviceName=KPS&pageId=__Page&method=closeServiceCustomersEditWindow"
                , "ServiceLevelAgreement.aspx"
                , "ServiceLineItem.aspx"
                , "ServiceList.aspx?id=1"
                , "ServicePackage.aspx"
                , "ServicePortfolio.aspx"
                , "ServicePortfolioStatus.aspx"
                , "ServiceRequestTypeEdit.aspx?serviceId=113&serviceName=KPS&pageId=__Page&method=closeServiceRequestTypeEditWindow"
                , "ServiceRestrictions.aspx"
                , "ServiceSupportersEdit.aspx?serviceId=115&serviceName=Windows 10&pageId=__Page&method=closeServiceSupportersEditWindow"
                , "SkillLevel.aspx"
                , "SkillMatrix.aspx"
                , "Skills.aspx"
                , "SkillStructure.aspx"
                , "SnmpTrap.aspx"
                , "SQLManagementViews.aspx"
                , "Status.aspx"
                , "StatusFilter.aspx"
                , "StatusFilters.aspx"
                , "StyleSheet.aspx"
                , "SubRequest.aspx?subRequestId=0&subRequestType=2&parentRequestId=12798&parentRequestType=undefined&controlId=ctl00_cph_subRequests&method=_processEditRequestWindowResults"
                , "SupplierManagement.aspx"
                , "SupportedOusEdit.aspx?ouCIId=11602&ouName=Test&isPerson=False&pageId=__Page&method=closeEditSupportedOusWindow"
                , "SurveyAdvancedSearch.aspx"
                , "SurveyList.aspx?id=1"
                , "SurveyQuestionAndAnswerAdvancedSearch.aspx"
                , "SurveyQuestionAndAnswerList.aspx?id=1"
                , "SurveyTemplate.aspx"
                , "SystemAudit.aspx"
                , "SystemSettings.aspx"
                , "TaxCode.aspx"
                , "TaxRate.aspx"
                , "TeamWorkload.aspx"
                , "TemplatedDateException.aspx"
                , "TemplatedException.aspx"
                , "TemplateDocument.aspx"
                , "TemplateParameters.aspx?category=1&actiontype=1&wfstatusid=0&suTemplateid=0"
                , "ThresholdRequestAdvancedSearch.aspx"
                , "ThresholdRequestList.aspx?id=1"
                , "TimeSpentAdvancedSearch.aspx"
                , "TimeSpentManagement.aspx"
                , "TimeSpentViewer.aspx"
                , "Unavailability.aspx"
                , "UnderpinningContract.aspx"
                , "UnitOfMeasure.aspx"
                , "Urgency.aspx"
                , "UrgencyChangeReason.aspx"
                , "UserDomainEdit.aspx?ouCIId=4029&ouName=$%20Directory%20Replicate&isPerson=False&pageId=__Page&method=closeEditUserDomainWindow"
                , "UserServices.aspx"
                , "ViewSurvey.aspx?id=1"
                , "Widgets.aspx"
                , "Workflow.aspx"
                , "WorkflowViewer.aspx?id=1"
                , "SummaryPages/AgreementSummaryHost.aspx?agType=ServiceLevelAgreement&serviceId=9400"
                , "SummaryPages/AuditConfigurationItemSummary.aspx?id=1"
                , "SummaryPages/CISummary.aspx?id=1"
                , "SummaryPages/CostAdjustment.aspx?id=230&parentInvokerId=__Page&parentInvokerMethod=_hideDetail&randomValue=0.20978823371726696"
                , "SummaryPages/CustomerSummary.aspx?id=1"
                , "SummaryPages/FinanceSummary.aspx?id=1"
                , "SummaryPages/KnownErrorSummary.aspx?id=116"
                , "SummaryPages/OlaSummary.aspx?id=1"
                , "SummaryPages/PersonalInformationSummary.aspx?id=1"
                , "SummaryPages/RequestSummary.aspx?id=1"
                , "SummaryPages/ServiceSummary.aspx?id=4"
                , "SummaryPages/SlaSummary.aspx?id=1"
                , "SummaryPages/StatusSummary.aspx?id=1"
                , "SummaryPages/UcSummary.aspx?id=1"
        ]

        const specialpages = [
                  "CIAttributes.aspx"
                , "CIBulkUpdateAttributes.aspx?ciIds=11598,11597,11596,11595,11592,11584,11583,11582,11581,11578,1278,1276,1283,1285,1280,1287,1289,1275,1277,11575,11574,11572,11571,5825,2755&ignoreRequired=true"
                , "RequestBulkUpdateAttributes.aspx?requestIds=47850,47851,47849,47848,47847,47846,47844,47840,47830,47829,47821,47820,14807,47818,47819,47817,47816,47815,47497,47813,47811,47810,47807,47805,47762&ignoreRequired=true"
                , "RequestSchedule.aspx"            
        ]

        
        pages.forEach(page => {
                it(`verifies the page form for ${page}`, () => {
                        cy.visit("https://challenger.marval.co.uk/MSM/RFP/Forms/" + page)
                        cy.get('#content').should('not.have.text', 'An Error Has Occurred')
                        
                })

        })


        specialpages.forEach(page => {
                it(`verifies the special cases page form for ${page}`, () => {
                        cy.visit("https://challenger.marval.co.uk/MSM/RFP/Forms/" + page)
                        cy.get('body').should('not.contain', 'An Error Has Occurred')
                })

        })


        it(`verify error page`, () => {
                cy.visit("https://challenger.marval.co.uk/MSM/RFP/Forms/SummaryPages/KnownErrorSummary.aspx?id=1")
                cy.get('body').should('contain', 'Error Has Occurred')
        })

})