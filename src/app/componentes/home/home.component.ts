import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../header/header.component";
import { Unsubscribe } from 'firebase/auth';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {

  subscription: Subscription | null = null;

  constructor(private auth : Auth, private router : Router){}


  ngOnInit() : void 
  {
    
  }

  ngOnDestroy(): void
  {

  }

}
