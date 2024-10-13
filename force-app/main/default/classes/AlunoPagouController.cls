public with sharing class AlunoPagouController {
    @AuraEnabled
    public static String getPagamento(Id alunoId) { // Retorna uma mensagem
        try {
            Aluno__c aluno = [SELECT Id, Status__c, DataInicio__c FROM Aluno__c WHERE Id = :alunoId LIMIT 1];
            
            if (aluno != null) {
                aluno.DataInicio__c = Date.today();
                aluno.Status__c = 'Em Dia';
                update aluno;
                
                return 'Aluno atualizado com sucesso';
            } else {
                return 'Aluno não encontrado';
            }
        } catch (DmlException e) {
            System.debug('Erro ao atualizar o aluno: ' + e.getMessage());
            return 'Erro ao atualizar o aluno: ' + e.getMessage();
        }
    }
}
