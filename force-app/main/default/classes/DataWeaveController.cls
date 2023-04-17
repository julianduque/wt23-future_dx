public with sharing class DataWeaveController {
  @AuraEnabled
  public static String fromCSVtoJSON(String csv) {
    return runDataWeave('CSVtoJSON', csv);
  }

  @AuraEnabled
  public static String fromJSONtoXML(String json) {
    return runDataWeave('JSONtoXML', json);
  }

  private static String runDataWeave(String scriptName, String payload) {
    DataWeave.Script dwScript = DataWeave.Script.createScript(scriptName);
    DataWeave.Result result = dwScript.execute(
      new Map<String, Object>{ 'payload' => payload }
    );
    String strResult = result.getValueAsString();
    return strResult;
  }
}
