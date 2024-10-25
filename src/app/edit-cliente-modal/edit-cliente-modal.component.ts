import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../services/cliente.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-cliente-modal',
  templateUrl: './edit-cliente-modal.component.html',
  styleUrls: ['./edit-cliente-modal.component.scss'],
})

export class EditClienteModalComponent {

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

  constructor(private clienteService: ClienteService, private modalController: ModalController, private alertController: AlertController) {}

  async updateCliente() {

    await this.clienteService.updateCliente(this.cliente.id, this.cliente);

    console.log('Cliente atualizado com sucesso!');

    this.close();
  }

  async confirmDelete() {

    const alert = await this.alertController.create({

      header: 'Confirmação',
      message: 'Deseja excluir este cliente?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteCliente();
          }
        }
      ]

    });

    await alert.present();
  }

  async deleteCliente() {

    await this.clienteService.deleteCliente(this.cliente.id);

    console.log('Cliente excluído com sucesso!');

    this.close();
    
  }

  close() {
    this.modalController.dismiss(this.cliente);
  }
}
