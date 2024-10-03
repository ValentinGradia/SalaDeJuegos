import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IJuego } from '../../interfaces/IJuego';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';
import { IPregunta } from '../../interfaces/IPregunta';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {

  preguntas : Array<any> = [];
  preguntaActual : IPregunta = {} as IPregunta ;
  respuestasActuales : Array<string> = [];
  respuestasCorrectas : number  = 0;

  constructor(private router: Router, private http: HttpService){}

  ngOnInit(): void {
    this.elegirPreguntaPrimeraVez();
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
    });
  }

  //Solo la primera vez para que se me cargen todas las preguntas para luego no tener que repetirlas
  async elegirPreguntaPrimeraVez() : Promise<void>
  {
    try
    {
      //el metodo suscribe es asincrono por lo que no bloquea el hilo de ejecucion,entonces lo convertimos
      //en promesa para poder bloquearlo

      const respuesta = await firstValueFrom(this.http.getData());//Convertimos el observable a una promesa
      const info = respuesta.questions;

      info.forEach((elemento : IPregunta)=> {
        var pregunta = {
          id : elemento.id,
          question : elemento.question,
          correctAnswers : elemento.correctAnswers,
          incorrectAnswers : elemento.incorrectAnswers
        }
        this.preguntas.push(pregunta);
      });    

      this.elegirPreguntaActual();
    }
    catch(eror : any){}
  }

  elegirPreguntaActual() : void
  {
    if(this.preguntas.length == 0)
    {
      this.preguntaActual = {} as IPregunta;
      Swal.fire({
        position: "center",
        title: "Haz acertado " + this.respuestasCorrectas + " respuestas",
        text : "¿Quieres volver a jugar?",
        showConfirmButton: true,
        confirmButtonText : "Si",
        showDenyButton: true,
        denyButtonText : "No"
      }).then((respuesta) => {
        if(respuesta.isConfirmed)
        {
          this.elegirPreguntaPrimeraVez();
        }
        else if(respuesta.isDenied)
        {
          this.router.navigateByUrl('/home');
        }
      });
    }
    else
    {
      this.preguntaActual = this.preguntas[Math.floor(Math.random() * this.preguntas.length)];
  
      this.concatenarRespuestas();
    }
  }

  //las respuestas correctas e incorrectas vienen separadas por lo que las combinamos en un array
  concatenarRespuestas() : void
  {
    
    this.respuestasActuales = [...this.preguntaActual.incorrectAnswers];
    this.respuestasActuales.push(this.preguntaActual.correctAnswers);

    this.respuestasActuales = this.desordenarRespuestas(this.respuestasActuales);
  }

  
  desordenarRespuestas(array : string[]) : string[]
  {
    var nuevoArray = [...array];//copiamos los elementos
    
    for (let i = nuevoArray.length - 1; i > 0; i--) {
      //indice aleatorio
      const j = Math.floor(Math.random() * (i + 1));
      
      // intercambiar elementos
      [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    
    return nuevoArray;
  }


  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async manejarRespuesta(respuesta : string, index : number): Promise<void>
  {

      const boton = document.getElementById(index.toString());
      if(this.preguntaActual.correctAnswers == respuesta)
      {
        this.respuestasCorrectas++;
        boton!.style.backgroundColor = "green";
      }
      else{boton!.style.backgroundColor = "red";}
  
      //detenemos el tiempo para que se muestre el color del boton (correcto o incorrecto)
      await this.delay(300);
  
      //sacamos la pregunta actual para que no se repita
      this.preguntas = this.preguntas.filter((pregunta : IPregunta) => pregunta !== this.preguntaActual);
  
      this.respuestasActuales = [];
      
      boton!.style.backgroundColor = "#8b9fa2";
      this.elegirPreguntaActual();
    
  }



}
