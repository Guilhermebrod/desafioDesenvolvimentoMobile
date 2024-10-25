import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

//classe que segura todos os dados a serem salvos
export interface Cliente{

  id: string;
  nome: string;
  servico?: string;
  situacao?: string;
  sistema?: string;
  protocolo?: string;
  nome_completo?: string;
  rg?: string;
  cpf?: string;
  endereco_residencial?: string;
  cnpj?: string;
  endereco_comercial?: string;
  valor_contrato?: number;
  forma_pagamento?: string;
  pagamento_entrada?: number;
  segunda_parcela?: number;
  municipio?: string;
  responsavel?: string;
  status?: string;

}

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  //funções de serviço para criar, editar e deletar dados de clietnes
  constructor(private firestore: AngularFirestore) { }

  getClientes(): Observable<Cliente[]> {
  return this.firestore.collection<Cliente>('clientes').valueChanges();
  }

  getCliente(id: string): Observable<Cliente | undefined> {
    return this.firestore.collection('clientes').doc<Cliente>(id).valueChanges();
  }

  addCliente(cliente: Cliente): Promise<void> {
    return this.getUltimoId().then(ultimoId => {
      const novoId = (parseInt(ultimoId) + 1).toString();
      cliente.id = novoId;
      return this.firestore.collection('clientes').doc(novoId).set(cliente);
    });
  }

  deleteCliente(id: string): Promise<void> {
    return this.firestore.collection('clientes').doc(id).delete();
  }

  updateCliente(id: string, cliente: Cliente): Promise<void> {
    return this.firestore.collection('clientes').doc(id).update(cliente);
  }
  
  //funçao para pegar o ultimo id informado para sempre acrescentar + 1 no id ao guardar um cliente novo
  getUltimoId(): Promise<string> {

    return this.firestore

      .collection<Cliente>('clientes', (ref) => ref.orderBy('id', 'desc').limit(1))
      .get()
      .toPromise()
      .then((snapshot) => {

        if (!snapshot || snapshot.empty) {
          //retorna 0 caso não tenha clientes
          return '0'; 

        } 
        
        else {

          const ultimoId = snapshot.docs[0].data().id;

          return ultimoId; 

        }
      });
  }
}
