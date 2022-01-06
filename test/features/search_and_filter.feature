@smoke
Feature: Search and Filter

@so_discount_filter
Scenario Outline: Search <item> with "<discount1> - <discount2>" discount  
When I open "https://www.asos.com/" url
    And I search for "<item>" 
    And I filter search results by "<discount1> - <discount2>" value
    And I wait "5" seconds
Then Filtered search results should have "<item>" in name
    And Filtered search results should be more than "<discount1>" and less than "<discount2>"

    Examples:
    | item   | discount1  | discount2 |
    | dress  | 20%        | 30%       |
    | heel  | 40%        | 50%       |