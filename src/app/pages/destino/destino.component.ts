import { Component, signal } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent {
  constructor(public destinoService: DestinoService) {
    setTimeout(() => {
      this.destinoAmerica.set(JSON.parse(sessionStorage.getItem('destinoAmerica') || '{}'))
      this.destinoEuropa.set(JSON.parse(sessionStorage.getItem('destinoEuropa') || '{}'))
    }, 500);
  }

  destinoAmerica = signal({
    "site": "",
    "country": "",
    "language": "",
    "unmissablePlace": "",
    "typicalFood": ""
  });
  destinoEuropa = signal({
    "site": "",
    "country": "",
    "language": "",
    "unmissablePlace": "",
    "typicalFood": ""
  });

  // destinos: any[] = [];
  // america: any[] = [];
  // europa: any[] = [];

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.destino();
  //   }, 5);
  // }

  // destino() {
  //   sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
  //     ? (this.control = false)
  //     : (this.control = true);

  //   this.destinoService
  //     .getDestinity(
  //       `searchName/${sessionStorage.getItem(
  //         'destinoAmerica'
  //       )}/${sessionStorage.getItem('destinoEuropa')}`
  //     )
  //     .then((response) => {
  //       this.destinos = response;
  //       this.filtrarDestinos();
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error('Error', error);
  //     });
  // }

  // filtrarDestinos(): void {
  //   this.america = this.destinos.filter(
  //     (destino) => destino.continente === 'América'
  //   );
  //   this.europa = this.destinos.filter(
  //     (destino) =>
  //       destino.continente === 'Europa' || destino.continente === 'Asia'
  //   );
  // }
}
