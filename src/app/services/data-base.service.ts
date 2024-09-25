import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { Chat } from '../clases/chat';
import { Firestore, collection,addDoc,getDoc,getDocs,updateDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private firestore : Firestore) { }

  guardar(chat : Chat) : void
  {
    const col = collection(this.firestore, 'Chat');
    addDoc(col,{correo: chat.correo, fecha : chat.fecha, mensaje: chat.mensaje});
  }

  traerChats() : Observable<any>
  {
    const col = collection(this.firestore, 'Chat');
    const obvervable = collectionData(col);
    
    //le toma una foto a la bbdd , trae los datos que estan en el momento que se ejecuta esta funcion
    // const observable = col.get();
    // observable.subscribe((data) =>{
    //   data.docs.forEach((documento) =>{
    //     console.log(documento.data());
    //   });
    // })

    //const observable = col.valueChanges();

    return obvervable; //hacer el subsrcribe desde el componente
  }

  actualizarChat(id : string, chatModificado : Chat)
  {
    const col = collection(this.firestore, 'Chat');
    const documento = doc(col,id)
    updateDoc(documento,{
      correo: chatModificado.correo, fecha : chatModificado.fecha, mensaje: chatModificado.mensaje
    });
  }

  eliminarChat(id : string)
  {
    const col = collection(this.firestore, 'Chat');
    const documento = doc(col,id)
    deleteDoc(documento);
  }
}
