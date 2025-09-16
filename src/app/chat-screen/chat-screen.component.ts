import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

interface IChat {
  chatTitle: string;
  id: number;
  userId: string;

}

@Component({
  selector: 'app-chat-screen',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {

  chats: IChat[];

  constructor (private http: HttpClient) { //Constroi a classe - inicializacao de variaveis
    
    this.chats = [];

  }
  ngOnInit () { //Executado quando o angular esta pronto para rodar - buscar dados da API.

    this.getChats();

  }
  async getChats () { //metodo que busca os chats da API
    let response = await this.http.get ("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }

    }).toPromise();

    if (response) {

      this.chats = response as [];


    } else {

      console.log("Erro ao buscar os chats.");


    }

  }

}

