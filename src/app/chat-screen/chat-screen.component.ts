import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface IChat {
  chatTitle: string;
  id: number;
  userId: string;

}

interface IMessage {
  chatId: number;
  text: string;
  userId: string;
  id: number;

}

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {

  chats: IChat[];
  chatSelecionado: IChat;
  mensagens: IMessage[];
  mensagemUsuario = new FormControl(""); //declaramos e atribuimos valor, nao precisa iniciar no construtor


  constructor(private http: HttpClient, private cd:ChangeDetectorRef) { //Constroi a classe - inicializacao de variaveis

    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];

  }
  ngOnInit() { //Executado quando o angular esta pronto para rodar - buscar dados da API.

    this.getChats();

  }
  async getChats() { //metodo que busca os chats da API
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }


    }))

    if (response) {

      this.chats = response as [];


    } else {

      console.log("Erro ao buscar os chats.");


    }

   this.cd.detectChanges();
  }

  async onChatClick(chatClicado: IChat) {

    console.log("Chat Clicado", chatClicado);

    this.chatSelecionado = chatClicado;

    //Logica para buscar as mensagens.
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }


    }));

    console.log ("MENSAGENS", response);

    this.mensagens = response as IMessage[];

    this.cd.detectChanges();

  }

  async enviarMensagem () {

    let novaMensagemUsuario = {
      chatId: this.chatSelecionado.id,
      userId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value
    };
  }
}
