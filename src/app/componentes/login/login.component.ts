import { Component, AfterViewInit, ElementRef, ViewChild, Input,Inject, Output, OnInit  } from '@angular/core';
import { AppComponent } from "../../app.component";
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Unsubscribe, user } from '@angular/fire/auth';
import { error } from 'console';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  correo !: string;
  contrasenia !: string;
  authSubscription?: Unsubscribe;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('register') registerBtn!: ElementRef;
  @ViewChild('login') loginBtn!: ElementRef;
  @ViewChild('loginToggle') loginToggleBtn!: ElementRef;
  @ViewChild('registerToggle') registerToggleBtn!: ElementRef

  constructor(private router : Router, private userService : UsuarioService){}


  llenarInputs(usuario : string)
  {
    switch(usuario)
    {
      case "admin":
        this.correo = "user@user.com";
        this.contrasenia = "333333";
        break;
      case "usuario":
        this.correo = "ng@gmail.com";
        this.contrasenia = "222222";
        break;
      default:
        this.correo = "hola@gmail.com";
        this.contrasenia = "654321";
    }
  }

  accederAplicacion()
  {
    try
    {
      var userCredential = this.userService.registrarUsuario(this.correo,this.contrasenia);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con exito",
        showConfirmButton: false,
        timer: 1500
      });
      if(userCredential == null)
      {
        throw new Error;
      }
      this.userService.setearCorreo(this.correo);
      this.router.navigateByUrl('/home');
    }
    catch(error : any)
    {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    }
  }

  async accederAplicacionLogin()
  {
    try
    {
      const user  = await this.userService.loguearUsuario(this.correo,this.contrasenia);
      Swal.fire({
        icon: "success",
        title: "Usuario logueado con exito",
        showConfirmButton: false,
        timer: 1500
      });

      if(user == null)
      {
        throw new Error();
      }

      //asigno el correo 
      this.userService.setearCorreo(this.correo);
      this.router.navigateByUrl('/home');
    }
    catch(error : any)
    {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Campos incorrectos"
      });
    }
  }

  ngAfterViewInit() {
    //Acceder y manipular el Dom
    const container = this.container.nativeElement;
    const registerBtn = this.registerBtn.nativeElement;
    const loginBtn = this.loginBtn.nativeElement;
    const loginToggleBtn = this.loginToggleBtn.nativeElement;
    const registerToggleBtn = this.registerToggleBtn.nativeElement;

    if (container && registerBtn && loginBtn && loginToggleBtn && registerToggleBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });

      loginToggleBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });

      registerToggleBtn.addEventListener('click', () => {
        container.classList.add('active');
      });
    }
  }
}
