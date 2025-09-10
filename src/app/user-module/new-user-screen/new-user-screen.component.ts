import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent {

  newForm: FormGroup;


  constructor (private fb: FormBuilder) {
    //quando a tela iniciar
    this.newForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]], //cria o campo obrigatorio de email
      password: ["", [Validators.required]] //cria o campo obrigatorio de senha
    })

  }

  async onLoginClick () {

    let response = await fetch ("https://senai-gpt-api.azurewebsites.net/users", { //fetch busca a informacao no servidor

      method: "POST", //enviar no metodo REST
      headers: {
        "Content-type" : "application/json"

      },
      body: JSON.stringify ({
        nome: this.newForm.value.name,
        email: this.newForm.value.email,
        password: this.newForm.value.password
      })

    });


  }
  





}
