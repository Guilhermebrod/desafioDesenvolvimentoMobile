import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../services/cliente.service';

@Component({
  selector: 'app-add-cliente-modal',
  templateUrl: './add-cliente-modal.component.html',
  styleUrls: ['./add-cliente-modal.component.scss'],
})
export class AddClienteModalComponent{

  cliente: Cliente = {
    id: '',
    nome: '',
    servico: '',
    situacao: '',
    sistema: '',
    protocolo: '',
    nome_completo: '',
    rg: '',
    cpf: '',
    endereco_residencial: '',
    cnpj: '',
    endereco_comercial: '',
    valor_contrato: 0,
    forma_pagamento: '',
    pagamento_entrada: 0,
    segunda_parcela: 0,
    municipio: '',
    responsavel: '',
    status: '',
  };

  constructor(private modalController: ModalController, private clienteService: ClienteService) {}

  async addCliente() {

    //o unico atributo obrigatorio é o nome do cliente
    if (!this.cliente.nome) {
      console.error('O nome é obrigatório.');
      return;
    }

    this.clienteService.addCliente(this.cliente).then(() => {
      console.log('Cliente adicionado com sucesso!');

      //fechar o modal
      this.close();

    }).catch(error => {
      //tratamento de erros
      console.error('Erro ao adicionar cliente: ', error);
    });
  }

  close() {

    this.modalController.dismiss();

  }

}
