import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent {

  newForm: FormGroup;

  emailErrorMessage: string;
  passwordErrorMessage: string;
  nameErrorMessage: string;
  password2ErrorMessage: string;
  correctPassword: string;
  caracPassword: string


  constructor (private fb: FormBuilder) {
    //quando a tela iniciar
    this.newForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required],Validators.email], //cria o campo obrigatorio de email
      password: ["", [Validators.required],Validators.minLength(6)], //cria o campo obrigatorio de senha
      password2: ["", [Validators.required]]
    });

    this.emailErrorMessage = ""; //inicia com uma string vazia
    this.passwordErrorMessage = "";
    this.nameErrorMessage = "";
    this.password2ErrorMessage = "";
    this.correctPassword = "";
    this.caracPassword = ""

  }

  validacoes() {


    this.emailErrorMessage = ""; 
    this.passwordErrorMessage = "";
    this.nameErrorMessage = "";
    this.password2ErrorMessage = "";
    this.correctPassword = "";
    this.caracPassword = "";

     if (this.newForm.value.name==="") {

      this.nameErrorMessage = "Preencha o nome"
      return false
    }

    if (this.newForm.value.email=== "") {

      
      this.emailErrorMessage = "O campo de e-mail é obrigatório"
      return false
     
    }

    if (this.newForm.value.password === "") {

  
      this.passwordErrorMessage = "O campo de senha é obrigatório"
      return false
      
     
    }
    if (this.newForm.value.password2=== "") {

      this.password2ErrorMessage = "Confirme a senha"
      return false
    }

    if (this.newForm.value.password != this.newForm.value.password2) {

      this.correctPassword = "As senhas precisam ser iguais"
      return false
    }

    if (this.newForm.value.password.length < 6) {

      this.caracPassword = "Senha pouca"
      return false
    }

    if (!this.newForm.valid) {
      this.emailErrorMessage = "Formato incorreto para e-mail"
      this.caracPassword = "A senha deve ter no mínimo 6 caracteres"
      return false
    }


    return true

  }

  async onEnterClick () {

  

   
    let hasError = this.validacoes();

    if (hasError == false) {
      return
    }


    let response = await fetch ("https://senai-gpt-api.azurewebsites.net/users", { //fetch busca a informacao no servidor

      method: "POST",
      headers: {
        "Content-type" : "application/json"        


      },
      body: JSON.stringify ({
        nome: this.newForm.value.name,
        email: this.newForm.value.email,
        password: this.newForm.value.password,
        
      })

    });

    console.log ("STATUS CODE", response.status)

    if (response.status>=200 && response.status<=299) {

      
      let json = await response.json();
      console.log("JSON",json);
      let userId = json.id;
      

      localStorage.setItem("meuId",userId);

      
      window.location.href = "login"
            

    }
    

  }
  





}
