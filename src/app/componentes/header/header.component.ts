import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-header',
  standalone: true,
  imports : [FontAwesomeModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faGamepad = faGamepad;
}
