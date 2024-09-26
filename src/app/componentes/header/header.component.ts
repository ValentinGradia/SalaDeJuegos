import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { error } from 'console';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  standalone: true,
  imports : [FontAwesomeModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  correoUsuario : string | null = null;
  suscripcionUsuario: Subscription;
  faGamepad = faGamepad;

  constructor(private auth : Auth, private router : Router, private userService: UsuarioService){
    this.suscripcionUsuario= this.userService.correoUsuario$.subscribe(email => {
      //con el metodo subscribe indico que quiero recibir los valores del observable
      //en este caso el email
      this.correoUsuario = email;
    })
  }

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
            this.router.navigateByUrl('/home');
            this.userService.limpiarCorreo();
          });
      } 
    });
  }

  ngOnDestroy(): void {
      this.suscripcionUsuario?.unsubscribe();
  }
}
