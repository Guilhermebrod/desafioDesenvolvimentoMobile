import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../services/cliente.service';
import { ModalController } from '@ionic/angular';
import { AddClienteModalComponent } from '../add-cliente-modal/add-cliente-modal.component';
import { EditClienteModalComponent } from '../edit-cliente-modal/edit-cliente-modal.component';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private modalController: ModalController) {}

  
  
  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  async openAddClienteModal() {

    const modal = await this.modalController.create({
      component: AddClienteModalComponent
    });
    
    return await modal.present();
  }

  openEditClienteModal(cliente: Cliente) {

    const modal = this.modalController.create({

      component: EditClienteModalComponent,
      componentProps: { cliente }

    });
  
    modal.then(modal => {

      modal.present();

      return modal.onDidDismiss();

    }).then(result => {

      if (result.data) {

        this.clientes = this.clientes.map(c => c.id === result.data.id ? result.data : c);

      }
    });
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent
    });
    return await modal.present();
  }

}
