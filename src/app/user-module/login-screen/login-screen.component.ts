import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

  loginForm: FormGroup;

  emailErrorMessage: string;
  passwordErrorMessage: string;
  loginSuccessful: string;
  loginFail: string;

  constructor (private fb: FormBuilder, private cd: ChangeDetectorRef) {
    //quando a tela iniciar
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]], //cria o campo obrigatorio de email
      password: ["", [Validators.required]] //cria o campo obrigatorio de senha
    });

    this.emailErrorMessage = ""; //inicia com uma string vazia
    this.passwordErrorMessage = "";
    this.loginSuccessful = "";
    this.loginFail = "";
    
  }

  async onLoginClick() { //funcao assincrona porque vai buscar as informacoes no servidor
    // alert("Botao de login clicado.");
    
    console.log ("Email", this.loginForm.value.email);
    console.log ("Password", this.loginForm.value.password);

    this.emailErrorMessage = ""; //inicia com uma string vazia
    this.passwordErrorMessage = "";
    this.loginSuccessful = "";
    this.loginFail = "";


     if (this.loginForm.value.email=== "") {

      // alert ("INSIRA O E-MAIL")
      this.emailErrorMessage = "O campo de e-mail é obrigatório"
      return;
    }

    if (this.loginForm.value.password === "") {

      // alert ("INSIRA A SENHA")
      this.passwordErrorMessage = "O campo de senha é obrigatório"
      // this.loginFail = "";
      // this.loginSuccessful = "";
      
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

      // alert ("O LOGIN DEU CERTO")
      this.loginSuccessful = "Login realizado com sucesso";

      let json = await response.json();
      console.log("JSON",json);
      let meuToken = json.accessToken;
      let userId = json.user.id;

      localStorage.setItem("meuToken", meuToken);
      localStorage.setItem("meuId", userId);

      window.location.href = "chat";

    }
    else {
      this.loginFail = "Falha no login"
      

    }


    this.cd.detectChanges(); //Forcar atualizacao da tela
    // else if (response.status>= 300 && response.status<=399) {

    //   alert ("ERRO- REDIRECIONAMENTO")
    // }
    // else if (response.status>=400 && response.status<=499) {

    //   alert ("ERRO - FALHA DE USUARIO")
    // }
    // else if (response.status>=500 && response.status<=599) {

    //   alert ("ERRO DE SERVIDOR")
    // }
    
   
  }

}
