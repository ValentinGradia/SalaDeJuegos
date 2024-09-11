import { Component, AfterViewInit, ElementRef, ViewChild, Input  } from '@angular/core';
import { AppComponent } from "../../app.component";
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('register') registerBtn!: ElementRef;
  @ViewChild('login') loginBtn!: ElementRef;
  @ViewChild('loginToggle') loginToggleBtn!: ElementRef;
  @ViewChild('registerToggle') registerToggleBtn!: ElementRef

  constructor(private router : Router){}

  accederAplicacion(msg : string)
  {
    Swal.fire({
      icon: "success",
      title: "Usuario "+msg+" con exito",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    //Acceder y manipular el Dom
    const container = this.container.nativeElement;
    const registerBtn = this.registerBtn.nativeElement;
    const loginBtn = this.loginBtn.nativeElement;
    const loginToggleBtn = this.loginToggleBtn?.nativeElement;
    const registerToggleBtn = this.registerToggleBtn?.nativeElement;

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
    } else {
      console.error('Elementos no encontrados en ViewChild');
    }
  }
}
