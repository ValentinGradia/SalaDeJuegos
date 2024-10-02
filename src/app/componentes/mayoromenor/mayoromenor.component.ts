import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { IJuego } from '../../interfaces/IJuego';

@Component({
  selector: 'app-mayoromenor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css'
})
export class MayoromenorComponent implements OnInit, IJuego {

  cartaActual !: number;
  cartaAnterior : number | null = null;
  srcCartaActual : string = "assets/cartas/mazo.png";
  puntaje : number = 0;
  intentos : number = 5;

  constructor(private router: Router){}

  ngOnInit(): void {
    Swal.fire({
      title: "REGLAS",
      text : 'El juego se basa en decidir si la carta que estas viendo sera mayor o menor que la siguiente. A medida que vayas acertando sumaras puntos, buena suerte! ',
      confirmButtonText: "Entendido",
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    }).then((result) => {
      if(result.isConfirmed)
        this.mostrarCarta();
    });
    
  }

  mostrarCarta()
  {
    var cartaAleatoria = Math.floor(Math.random() * (14 - 2 + 1)) + 2;
    this.cartaActual = cartaAleatoria;
    this.srcCartaActual = "assets/cartas/"+ cartaAleatoria+'.png';
  }

  mayor()
  {
    this.cartaAnterior = this.cartaActual;
    this.mostrarCarta();
    if(this.cartaAnterior > this.cartaActual)
    {
      this.puntaje++;
    }
    else
    {
      this.intentos--;
    }

    this.verificarIntentos();

    
  }

  menor()
  {
    this.cartaAnterior = this.cartaActual;
    this.mostrarCarta();
    if(this.cartaAnterior < this.cartaActual)
    {
      this.puntaje++;
    }
    else
    {
      this.intentos--;
    }

    this.verificarIntentos();
  }

  verificarIntentos()
  {
    if(this.intentos == 0)
      {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Tristemente haz perdido :(",
          text : "¿Quieres volver a jugar?",
          showConfirmButton: true,
          confirmButtonText : "Si",
          showDenyButton: true,
          denyButtonText : "No"
        }).then((respuesta) => {
          if(respuesta.isConfirmed)
          {
            this.volverAEmpezar();
          }
          else if(respuesta.isDenied)
          {
            this.router.navigateByUrl('/home');
          }
        });
      }
  }

  volverAEmpezar()
  {
    this.intentos = 6;
    this.puntaje = 0;
    this.mostrarCarta();
  }

}
