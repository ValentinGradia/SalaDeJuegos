import { Component, AfterViewInit, ElementRef, ViewChild, Input,Inject  } from '@angular/core';
import { AppComponent } from "../../app.component";
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo !: string;
  contrasenia !: string;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('register') registerBtn!: ElementRef;
  @ViewChild('login') loginBtn!: ElementRef;
  @ViewChild('loginToggle') loginToggleBtn!: ElementRef;
  @ViewChild('registerToggle') registerToggleBtn!: ElementRef

  constructor(private router : Router, private auth : Auth){}


  accederAplicacion()
  {
    createUserWithEmailAndPassword(this.auth, this.correo, this.contrasenia)
    .then((userCredential) => {
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con exito",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    });
  }

  accederAplicacionLogin()
  {
    signInWithEmailAndPassword(this.auth,this.correo,this.contrasenia)
    .then((user) => {
      Swal.fire({
        icon: "success",
        title: "Usuario logeado con exito",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(user);
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Campos incorrectos"
      });
    });
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
