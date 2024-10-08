import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import path from 'path';
import { ChatComponent } from './componentes/chat/chat.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { BlackjackComponent } from './componentes/blackjack/blackjack.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/chat',
        pathMatch : 'full'
    },
    {
        path : 'home',
        component : HomeComponent
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'quienSoy',
        component : QuienSoyComponent
    },
    {
        path : 'chat',
        component : ChatComponent
    },
    {
        path : 'mayorOMenor',
        component : MayoromenorComponent,
        canActivate : [authGuard]
    },
    {
        path : 'ahorcado',
        component : AhorcadoComponent,
        canActivate : [authGuard]
    },
    {
        path : 'preguntados',
        component : PreguntadosComponent,
        canActivate : [authGuard]
    },
    {
        path : 'blackJack',
        component : BlackjackComponent,
        canActivate : [authGuard]
    },
    {
        path : '**',
        redirectTo : '/home'
    }
];
