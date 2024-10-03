import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { IJuego } from '../../interfaces/IJuego';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit, IJuego {

  letras : Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  palabras : Array<string> = ["computadora", "telefono", "carpeta", "montaña", "playa", "reloj", "bicicleta", "ventana", "puerta", "espejo",
  "avion", "tren", "zapato", "camiseta", "lavadora", "almohada", "pincel", "cuaderno", "pizarra", "maleta",
  "camion", "botella", "hamburguesa", "lampara", "teclado", "raton", "calculadora", "microondas", "sillon", "mochila"];

  palabraAdivinar : string = '';

  letrasARemover : Array<string> = [];

  letrasApretadas : Array<string> = [];

  intentos = 6;

  constructor(private router : Router){}

  ngOnInit(): void {
    Swal.fire({
      title: "REGLAS",
      text : 'Tendras que adivinar la palabra haciendo click en las letras que piensas que tendra la palabra. Si la letra ya la presionaste se ocultara para que no te olvides cuales presionaste. Dispondras de 6 intentos para adivinarla, buena suerte!',
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

    console.log(this.palabraAdivinar);
  }


  //metodo para que las letras no acertadas no se muestren
  letraSinAdivinar(letra : string)
  {
    return !this.letrasARemover.includes(letra);
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

    this.verificarIntentos();

    var letrasJuntas = this.letrasARemover.join('');

    var cantLetrasIguales = 0
    var cantLetras = this.palabraAdivinar.length;
    for(let letra of this.palabraAdivinar)
    {
      //h
      for(let otraletra of letrasJuntas)// alho
      {
        if(letra == otraletra)
        {
          cantLetrasIguales++;
          break;
        }
      }
    }


    if(cantLetras == cantLetrasIguales)
    {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Felicidades , haz ganado!!!!",
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

    this.letrasApretadas.push(letra);
  }


  verificarIntentos() : void
  {
    if(this.intentos == 0)
    {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tristemente haz perdido :(, La palabra era " + this.palabraAdivinar,
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


  volverAEmpezar() : void
  {
    this.elegirPalabra();
    this.letrasARemover = [];
    this.letrasApretadas = [];
    this.intentos = 6;
  }

}
