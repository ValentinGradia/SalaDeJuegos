import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { DataBaseService } from '../../services/data-base.service';
import { Subscription } from 'rxjs';
import { Chat } from '../../clases/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy {

  suscripcionChat:Subscription | null = null;
  correoUsuarioActual : string = '';
  mensaje : string = ''; 

  chats: Chat[]= [];
  constructor(private userService: UsuarioService, private router: Router, private database: DataBaseService){}

  ngOnInit(): void {
      if(this.userService.correoUsuarioObservable.getValue() == null)
      {
        this.router.navigateByUrl('/home');
      }
      else
      {
        
        this.correoUsuarioActual = this.userService.correoUsuarioObservable.getValue()!;
        const observable = this.database.traerChats();

        this.suscripcionChat = observable.subscribe((chat) => {
          this.chats = chat as Chat[];
        })
      }
  }

  enviarMensaje()
  {
    var chat = new Chat(this.correoUsuarioActual,new Date(),this.mensaje);
    this.database.guardar(chat);
    this.mensaje = '';
  }

  ngOnDestroy(): void {
      this.suscripcionChat?.unsubscribe();
  }

}
