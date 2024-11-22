import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent {
  constructor(public destinoService: DestinoService) {}

  control: boolean = true;
  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];
  americaImages: any[] = [];
  europaImages: any[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.destino();
    }, 5);
  }

  destino() {
    sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
      ? (this.control = false)
      : (this.control = true);

    this.destinoService
      .getDestinity(
        `searchName/${sessionStorage.getItem(
          'destinoAmerica'
        )}/${sessionStorage.getItem('destinoEuropa')}`
      )
      .then((response) => {
        this.destinos = response;
        this.filtrarDestinos();
        this.cargarImagenes();
        console.log(response);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  filtrarDestinos(): void {
    this.america = this.destinos.filter(
      (destino) => destino.continente === 'América'
    );
    this.europa = this.destinos.filter(
      (destino) =>
        destino.continente === 'Europa' || destino.continente === 'Asia'
    );
  }

  cargarImagenes(): void {
    if (this.america.length > 0) {
      const destinoAmerica = this.america[0].nombreDestino;
      this.destinoService.getPixabayImages(destinoAmerica)
        .then((images) => {
          this.americaImages = images;
        })
        .catch((error) => {
          console.error('Error fetching America images', error);
        });
    }

    if (this.europa.length > 0) {
      const destinoEuropa = this.europa[0].nombreDestino;
      this.destinoService.getPixabayImages(destinoEuropa)
        .then((images) => {
          this.europaImages = images;
        })
        .catch((error) => {
          console.error('Error fetching Europa images', error);
        });
    }
  }
}
