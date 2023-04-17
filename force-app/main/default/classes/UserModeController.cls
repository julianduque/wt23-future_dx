public with sharing class UserModeController {
  @AuraEnabled
  public static List<Account> listAccounts() {
    return [SELECT Id, Name, Secure__c FROM Account];
  }

  @AuraEnabled
  public static List<Account> listAccountsWithSecurityEnforced() {
    try {
      return [SELECT Id, Name, Secure__c FROM Account WITH SECURITY_ENFORCED];
    } catch (Exception ex) {
      String error = ex.getMessage();
      throw new AuraHandledException(error);
    }
  }

  @AuraEnabled
  public static List<Account> listAccountsWithUserMode() {
    try {
      return [SELECT Id, Name, Secure__c FROM Account WITH USER_MODE];
    } catch (Exception ex) {
      String error = ex.getMessage();
      throw new AuraHandledException(error);
    }
  }

  @AuraEnabled
  public static void insertAccount(String name, String secure) {
    try {
      Account account = new Account(Name = name);
      account.Secure__c = secure;
      insert account;
    } catch (Exception ex) {
      String error = ex.getMessage();
      throw new AuraHandledException(error);
    }
  }

  @AuraEnabled
  public static void insertAccountAsSystem(String name, String secure) {
    try {
      Account account = new Account(Name = name);
      account.Secure__c = secure;
      insert as system account;
    } catch (Exception ex) {
      String error = ex.getMessage();
      throw new AuraHandledException(error);
    }
  }

  @AuraEnabled
  public static void insertAccountAsUser(String name, String secure) {
    try {
      Account account = new Account(Name = name);
      account.Secure__c = secure;
      insert as user account;
    } catch (Exception ex) {
      String error = ex.getMessage();
      throw new AuraHandledException(error);
    }
  }
}
