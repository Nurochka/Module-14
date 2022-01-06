@smoke
Feature: Login

@asos_login
Scenario: Login with Test Account user
    Given I open "https://www.asos.com/" url
    When I login with "test.account.2022@mail.ru" email and "FTM_Basics@2022" password
        And I wait "5" seconds
    Then User name "Test" is displayed on a page


