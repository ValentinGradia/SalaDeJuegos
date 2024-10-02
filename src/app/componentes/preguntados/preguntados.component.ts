import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IJuego } from '../../interfaces/IJuego';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';
import { IPregunta } from '../../interfaces/IPregunta';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {

  preguntas : Array<object> = [];
  preguntaActual : object = {};
  preguntasRespondidas : Array<object> = [];

  constructor(private router: Router, private http: HttpService){}

  ngOnInit(): void {
    Swal.fire({
      title: "REGLAS",
      text : 'A continuacion se van a ir mostrando preguntas las cuales deberas responder de manera correcta. Por cada respuesta correcta sumaras puntaje. Buena suerte!',
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
        this.elegirPregunta();
    });
  }

  async elegirPregunta() : Promise<void>
  {
    await this.http.getData().subscribe((respuesta) => {
      var info = respuesta.questions;
      //console.log(info);
      info.forEach((elemento : IPregunta)=> {
        var pregunta = {
          id : elemento.id,
          question : elemento.question,
          correctAnswers : elemento.correctAnswer,
          incorrectAnswers : elemento.incorrectAnswers
        }

        this.preguntas.push(pregunta);
      });    
    })

    this.preguntaActual = this.preguntas[Math.floor(Math.random() * this.preguntas.length)];
  }

  volverAEmpezar(): void {
      
  }

  verificarIntentos(): void {
      
  }

}
