trigger statusTrigger on Aluno__c (before insert, before update) {
    for (Aluno__c aluno : Trigger.new) {
        if (aluno.Vencimento__c != null && aluno.Vencimento__c < Date.today()) {
            aluno.Status__c = 'Atrasado';
        } else {
            aluno.Status__c = 'Em dia';
        }
    }
}