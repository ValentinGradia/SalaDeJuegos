import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  letras : Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  palabras : Array<string> = ["computadora", "telefono", "carpeta", "montaña", "playa", "reloj", "bicicleta", "ventana", "puerta", "espejo",
  "avion", "tren", "zapato", "camiseta", "lavadora", "almohada", "pincel", "cuaderno", "pizarra", "maleta",
  "camion", "botella", "hamburguesa", "lampara", "teclado", "raton", "calculadora", "microondas", "sillon", "mochila"];

  palabraAdivinar : string = '';

  letrasARemover : Array<string> = [];

  letrasApretadas : Array<string> = [];

  intentos : number = 10;

  constructor(){}

  ngOnInit(): void {
    Swal.fire({
      title: "REGLAS",
      text : 'Tendras que adivinar la palabra haciendo click en las letras que piensas que tendra la palabra. Si la letra ya la presionaste se ocultara para que no te olvides cuales presionaste. Dispondras de 10 intentos para adivinarla, buena suerte!',
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
        this.elegirPalabra();
    });
  }

  //elegimos la palabra aleatoria que el usuario va a tener que adivinar
  elegirPalabra()
  {
    var indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    this.palabraAdivinar = this.palabras[indiceAleatorio];
    this.llenarCasilleros(this.palabraAdivinar.length);
    console.log(this.palabraAdivinar);
  }


  //metodo para que las letras no acertadas no se muestren
  letraSinAdivinar(letra : string)
  {
    return !this.letrasARemover.includes(letra);
  }

  llenarCasilleros(length : number) : void
  {

  }

  //funcion que la creamos para mostrar las letras cuando aciertan
  letraEstaAdivinada(letra : string) : boolean
  {
    return this.letrasARemover.includes(letra);
  }


  elegirLetra(letra : string)
  {

    if(this.palabraAdivinar.includes(letra))
    {
      //Para que no se repita(aprueba de error)
      if(!this.letrasARemover.includes(letra))
      {
        this.letrasARemover.push(letra);
      }
    }
    else
    {
      //Evitar errores si vuelve a presionar la letra
      if(!(this.letrasApretadas.includes(letra)))
      {
        this.intentos--;
      }
    }

    this.letrasApretadas.push(letra);
  }

}
