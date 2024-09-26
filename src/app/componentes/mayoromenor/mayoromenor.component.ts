import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayoromenor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css'
})
export class MayoromenorComponent implements OnInit {

  cartaActual !: number;
  cartaAnterior : number | null = null;
  srcCartaActual : string = "assets/cartas/mazo.png";
  puntaje : number = 0;

  constructor(){}

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
  }

  menor()
  {
    this.cartaAnterior = this.cartaActual;
    this.mostrarCarta();
    if(this.cartaAnterior < this.cartaActual)
    {
      this.puntaje++;
    }
  }

}
