import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../services/cliente.service';
import { EditClienteModalComponent } from '../edit-cliente-modal/edit-cliente-modal.component';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})

export class SearchModalComponent {
  searchTerm: string = '';
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  constructor(private clienteService: ClienteService, private modalController: ModalController) {}

  ngOnInit() {
    // metodo pra pegar os clientes
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  //busca por clientes, caso retorne a lista vazia, o html não mostra nada
  searchClientes() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.clientesFiltrados = [];
    }
  }

  //mesma coisa da lista de clientes de edição
  openClienteDetails(cliente: Cliente) {
    const modal = this.modalController.create({
      component: EditClienteModalComponent,
      componentProps: { cliente }
  });

  modal.then(modal => {
    modal.present();
    return modal.onDidDismiss();
  }).then(result => {
    if (result.data) {
       // Atualiza a lista de clientes com os dados retornados
      this.clientes = this.clientes.map(c => c.id === result.data.id ? result.data : c);
    }
  });
}

  close() {
    this.modalController.dismiss();
  }
}
