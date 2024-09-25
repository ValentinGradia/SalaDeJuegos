import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./componentes/login/login.component";
import { HomeComponent } from "./componentes/home/home.component";
import { QuienSoyComponent } from "./componentes/quien-soy/quien-soy.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FontAwesomeModule, LoginComponent, HomeComponent, QuienSoyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SalaJuegos';
  mostrarTemplateLogin : boolean = false;

  correoUsuario : string | null = null;

  mostrarLogin()
  {
    this.mostrarTemplateLogin = true;
  }
}
