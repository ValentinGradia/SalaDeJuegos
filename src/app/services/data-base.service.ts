import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { Chat } from '../clases/chat';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private firestore : AngularFirestore) { }

  guardar(chat : Chat) : void
  {
    const col = this.firestore.collection('Chat');
    col.add({correo: chat.correo, fecha : chat.fecha, mensaje: chat.mensaje, Nombre: chat.nombre });
  }

  traerUsuarios() : Observable<any>
  {
    const col = this.firestore.collection('Chat');
    
    //le toma una foto a la bbdd , trae los datos que estan en el momento que se ejecuta esta funcion
    // const observable = col.get();
    // observable.subscribe((data) =>{
    //   data.docs.forEach((documento) =>{
    //     console.log(documento.data());
    //   });
    // })

    const observable = col.valueChanges();

    return observable; //hacer el subsrcribe desde el componente
  }
}
