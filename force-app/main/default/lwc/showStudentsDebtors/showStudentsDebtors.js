import { LightningElement, wire } from 'lwc';
import getAlunosAtrasados from '@salesforce/apex/alunosController.getAlunosAtrasados';
import getPagamento from '@salesforce/apex/AlunoPagouController.getPagamento';
import { refreshApex } from '@salesforce/apex';

export default class ShowStudentsDebtors extends LightningElement {
    pendentes = [
        { label: 'Nome', fieldName: 'name', type: 'text' },
        { label: 'Status', fieldName: 'status', type: 'text' },
        { label: 'Dias Atrasados', fieldName: 'dias', type: 'number' },
        { 
            label: 'Pagar', 
            type: 'button', 
            typeAttributes: { 
                label: 'Pagar', 
                name: 'pagar', 
                title: 'Clique para pagar', 
                variant: 'brand' 
            }
        }
    ];

    alunos = [];
    wiredAlunosResult;
    showModal = false;
    selectedAlunoId; // Armazena o ID do aluno selecionado

    @wire(getAlunosAtrasados)
    wiredAlunos(result) {
        this.wiredAlunosResult = result;
        const { data, error } = result;
        if (data) {
            this.alunos = data.map(aluno => ({
                id: aluno.Id, 
                name: aluno.Name, 
                status: aluno.Status__c,
                dias: aluno.DiasAtrasados__c
            }));
        } else if (error) {
            console.error('Erro ao obter alunos: ', error);
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'pagar') {
            this.selectedAlunoId = row.id; // Armazena o ID do aluno
            this.showModal = true; // Exibe o modal de confirmação
        }
    }

    closeModal() {
        this.showModal = false; // Fecha o modal sem confirmar
    }

    confirmPayment() {
        this.showModal = false; // Fecha o modal após confirmação
        this.getPagamento(this.selectedAlunoId); // Executa o pagamento
    }

    getPagamento(alunoId) {
        getPagamento({ alunoId }) 
            .then(() => {
                return refreshApex(this.wiredAlunosResult); 
            })
            .then(() => {
                console.log('Tabela atualizada com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao pagar aluno: ', error);
            });
    }
}
