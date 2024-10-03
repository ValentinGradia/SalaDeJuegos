import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent implements OnInit {

  cartasBlackjack: string[] = [
    'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠',
    'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣',
    'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
    'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦'
  ];

  cartasJugadas : Array<string> = [];
  cartasDealer : Array<string> = [];
  cartasUsuario : Array<string> = [];
  sumaDealer : number | null = null;
  sumaUsuario : number | null = null;

  constructor(){}

  ngOnInit(): void {
      this.repartirCartas();
  }

  repartirCartas() : void
  {
    //Primera carta dealer
    this.cartasDealer.push(this.cartasBlackjack[this.indiceAleatorio()]);
    this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);

    //Primera carta usuario
    this.cartasUsuario.push(this.cartasBlackjack[this.indiceAleatorio()]);
    this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);

    //Segunda carta dealer
    this.cartasDealer.push(this.cartasBlackjack[this.indiceAleatorio()]);
    this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);

    //Segunda carta usuario
    this.cartasUsuario.push(this.cartasBlackjack[this.indiceAleatorio()]);
    this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);

    this.sumaDealer = this.calcularSuma(this.cartasDealer);

    this.sumaUsuario = this.calcularSuma(this.cartasUsuario);

  }

  indiceAleatorio() : number
  {
    return Math.floor(Math.random() * this.cartasBlackjack.length);
  }

  borrarCarta(cartaParam : string) : void
  {
    this.cartasBlackjack = this.cartasBlackjack.filter(carta => carta !== cartaParam );
  }
  

  calcularSuma(cartas : Array<string>) : number
  {
    var sumaTotal : number = 0;
    cartas.forEach(carta => {
      
      var valor = '';
      if(carta.length !== 2)
      {
        valor = carta.slice(0,2);
      }else{
        valor = carta.charAt(0);
      }

      switch(valor)
      {
        case "J":
        case "Q":
        case "K":
          valor = '10';
          break;
        case "A":
          valor = '11';
          break;
        default:
          break;
      }
      sumaTotal += Number(valor);

    });

    return sumaTotal;
  }


}
