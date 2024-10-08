import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { faL } from '@fortawesome/free-solid-svg-icons';

//funcion
export const authGuard: CanActivateFn = (route, state) => {

  var usuarioService = inject(UsuarioService);


  if(usuarioService.correoUsuarioObservable.getValue() == null)
  {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Para acceder a los juegos debes estar logueado",
      showConfirmButton: true,
    });

    return false
  }
  else{return true;}

  
};
