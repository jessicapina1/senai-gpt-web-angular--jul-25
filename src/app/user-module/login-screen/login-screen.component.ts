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

  onLoginClick() {
    alert("Botao de login clicado.")
    console.log ("Email", this.loginForm.value.email)
    console.log ("Password", this.loginForm.value.password)

  }

}
