import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Observable, retry } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Unsubscribe } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth : Auth, private router : Router) { }


  registrarUsuario(correo : string, contrasenia : string)
  {
    createUserWithEmailAndPassword(this.auth, correo, contrasenia)
    .then((user) => {

      return user;
    })
    .catch((error) => {
      return error;
    });
  }

  loguearUsuario(correo : string, contrasenia : string)
  {

    signInWithEmailAndPassword(this.auth,correo,contrasenia)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      return error;
    })

  }

}
