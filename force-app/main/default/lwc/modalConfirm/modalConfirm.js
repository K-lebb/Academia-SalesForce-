import { LightningElement, api } from 'lwc';

export default class ModalConfirm extends LightningElement {
    @api showModal = false; // Controle para exibir ou ocultar o modal

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }
}
