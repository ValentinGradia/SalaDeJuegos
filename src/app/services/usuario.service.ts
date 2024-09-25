import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Observable, retry } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Unsubscribe, User, UserCredential } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth : Auth, private router : Router) { }

  correoUsuarioObservable = new BehaviorSubject<string | null>(null);//tipo de observable
  correoUsuario$ = this.correoUsuarioObservable.asObservable(); //para poder tener los metodos de un observable y exponerlo a otros componentes

  setearCorreo(email : string)
  {
    //metodo next asigno el email al objeto
    this.correoUsuarioObservable.next(email);
  }

  limpiarCorreo()
  {
    this.correoUsuarioObservable.next(null);
  }

  async registrarUsuario(correo : string, contrasenia : string)
  {
    try
    {
      var data = await createUserWithEmailAndPassword(this.auth,correo,contrasenia)
      return data.user;
    }
    catch(error)
    {
      return null;
    }
  }

  async loguearUsuario(correo : string, contrasenia : string) : Promise<User | null>
  {
    try
    {
      var data = await signInWithEmailAndPassword(this.auth,correo,contrasenia)
      return data.user;
    }
    catch(error)
    {
      return null;
    }

  }

}
