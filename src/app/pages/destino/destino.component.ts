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
  destinoAmerica = signal({
    site: "",
    country: ""
  });

  destinoEuropa = signal({
    site: "",
    country: ""
  });

  constructor(public destinoService: DestinoService) {
    setTimeout(() => {
      this.destinoAmerica.set(JSON.parse(sessionStorage.getItem('destinoAmerica') || '{"site": "", "country": ""}'));
      this.destinoEuropa.set(JSON.parse(sessionStorage.getItem('destinoEuropa') || '{"site": "", "country": ""}'));
      this.loadImages(this.destinoAmerica().site, this.destinoEuropa().site);
    }, 500);
  }

  

  async loadImages(destinoAmericaSite: string, destinoEuropaSite: string) {
    try {
      const americaImage = await this.destinoService.getPixabayImages(destinoAmericaSite);
      const europaImage = await this.destinoService.getPixabayImages(destinoEuropaSite);
      this.destinoService.srcA = americaImage;
      this.destinoService.srcE = europaImage;
    } catch (error) {
      console.error('Error loading images', error);
    }
  }
}

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

