import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
  victorias : number = 0;

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


    //Segunda carta usuario
    this.cartasUsuario.push(this.cartasBlackjack[this.indiceAleatorio()]);
    this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);

    this.sumaDealer = this.calcularSuma(this.cartasDealer);

    if(this.sumaDealer == 22)
    {
      this.sumaDealer = 21;
    }

    this.sumaUsuario = this.calcularSuma(this.cartasUsuario);

    if(this.sumaUsuario == 22)
    {
      this.sumaUsuario = 21;
    }

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


  //Dependiendo el palo que toque le cambiamos el color (Rojo o negro)
  verificarPalo(carta : string) : boolean
  {
    var palo = '';
    if(carta.length !== 2)
    {
      palo = carta.charAt(2);
    }
    else{palo = carta.charAt(1);}

    if(palo == "♥" || palo == "♦")
    {
      return true;
    }
    else{return false}

  }

  pedirCarta(jugador : string) : void
  {
    if(jugador == "usuario")
    {
      this.cartasUsuario.push(this.cartasBlackjack[this.indiceAleatorio()]);
      this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);
  
      this.sumaUsuario = this.calcularSuma(this.cartasUsuario);

      if(this.verificarSiSePaso(this.sumaUsuario!))
      {
        this.actualizarVictorias('resta');
      }
    }
    else
    {
      this.cartasDealer.push(this.cartasBlackjack[this.indiceAleatorio()]);
      this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);
  
      this.sumaDealer = this.calcularSuma(this.cartasDealer);

      while(this.sumaDealer < 16)
      {
        this.cartasDealer.push(this.cartasBlackjack[this.indiceAleatorio()]);
        this.borrarCarta(this.cartasBlackjack[this.indiceAleatorio()]);
    
        this.sumaDealer = this.calcularSuma(this.cartasDealer);
      }

      if (this.verificarSiSePaso(this.sumaDealer!)) {
        this.actualizarVictorias('suma');
    } else {
        this.sumaDealer! > this.sumaUsuario! ? this.actualizarVictorias('resta') : this.sumaDealer! == this.sumaUsuario! ?  this.actualizarVictorias('empate') : this.actualizarVictorias('suma');
    }

    }

  }

  actualizarVictorias(calculo : string) : void
  {

    if(calculo == 'suma')
    {
      this.finalizarJuegoMomentaneo('victoria');
      this.victorias++
    }
    else if(calculo == 'resta')
    {
      if(this.victorias > 0){
        this.victorias--;
      }
      this.finalizarJuegoMomentaneo('derrota');
    }
    else{this.finalizarJuegoMomentaneo('empate');}
  }

  volverAJugar() : void
  {
    this.sumaDealer = null;
    this.sumaUsuario = null;
    this.cartasJugadas.forEach(element => {
      this.cartasBlackjack.push(element);
    });
    this.cartasDealer = [];
    this.cartasUsuario = [];
    
    this.repartirCartas();
  }


  verificarSiSePaso(numero : number) : boolean
  {
    if(numero > 21){return true;}else{return false;}
  }

  quedarse() : void
  {
    if(this.sumaDealer! < 16)
    {
      this.pedirCarta("dealer");
    }
    else
    {
      this.sumaUsuario! > this.sumaDealer! ? this.actualizarVictorias('suma') : this.sumaDealer! > this.sumaUsuario! ? this.actualizarVictorias('resta') : this.actualizarVictorias('empate');
    }
  }

  async finalizarJuegoMomentaneo(resultado : string) : Promise<void>
  {
    const icono = resultado == 'victoria' ? "success" : resultado == 'derrota' ? 'error' : 'info';
    const mensaje = resultado == 'victoria' ? "Haz ganado" : resultado == 'derrota' ? 'Haz perdido' : 'empate';

    await Swal.fire({
      position: "center",
      icon: icono,
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });

    this.volverAJugar();
  }


}
