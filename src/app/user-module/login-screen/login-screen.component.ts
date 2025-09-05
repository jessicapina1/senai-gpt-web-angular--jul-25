import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

  loginForm: FormGroup;

  constructor (private fb: FormBuilder) {
    //quando a tela iniciar
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]], //cria o campo obrigatorio de email
      password: ["", [Validators.required]] //cria o campo obrigatorio de senha
    });

  }

  async onLoginClick() { //funcao assincrona porque vai buscar as informacoes no servidor
    alert("Botao de login clicado.");
    console.log ("Email", this.loginForm.value.email);
    console.log ("Password", this.loginForm.value.password);

     if (this.loginForm.value.email=== "") {

      alert ("INSIRA O E-MAIL")
      return;
    }

    if (this.loginForm.value.password === "") {

      alert ("INSIRA A SENHA")
      return;
    }


    let response = await fetch ("https://senai-gpt-api.azurewebsites.net/login", { //fetch busca a informacao no servidor

      method: "POST", //enviar no metodo REST
      headers: {
        "Content-type" : "application/json"

      },
      body: JSON.stringify ({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })

    }); 

    console.log ("STATUS CODE", response.status)

    if (response.status>=200 && response.status<=299) {

      alert ("O LOGIN DEU CERTO")

    }
    else if (response.status>= 300 && response.status<=399) {

      alert ("ERRO- REDIRECIONAMENTO")
    }
    else if (response.status>=400 && response.status<=499) {

      alert ("ERRO - FALHA DE USUARIO")
    }
    else if (response.status>=500 && response.status<=599) {

      alert ("ERRO DE SERVIDOR")
    }
    
   
  }

}
