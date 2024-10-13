public with sharing class pagamentoController {
    @AuraEnabled(cacheable=true)
    public static List<Aluno__c> getAlunosAtrasados() {
        return [SELECT Id, Name, Status__c, Vencimento__c, DiasAtrasados__c FROM Aluno__c WHERE Status__c = 'Atrasado'];
    }
}
