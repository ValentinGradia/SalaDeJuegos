import { Component, Input, input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { error } from 'console';
import { Usuario } from '../../clases/usuario';



@Component({
  selector: 'app-header',
  standalone: true,
  imports : [FontAwesomeModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private auth : Auth, private router : Router){}

  faGamepad = faGamepad;

  cerrarSesion() {
    Swal.fire({
      title: "¿Estás seguro que queres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(this.auth)
          .then(() => {
            this.router.navigateByUrl("/login");
          });
      } 
    });
  }
}
