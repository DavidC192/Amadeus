import { Component, importProvidersFrom } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  constructor(public destinoService: DestinoService) {}

  destinoAmerica = '';
  destinoEuropa = '';
  pDestino = this.destinoService.respuestasSer[0];
  pClimatica = this.destinoService.respuestasSer[1];
  pActividad = this.destinoService.respuestasSer[2];
  pAlojamiento = this.destinoService.respuestasSer[3];
  dViaje = this.destinoService.respuestasSer[4];
  edad = this.destinoService.respuestasSer[5];

  volverAtras() {
    this.destinoService.indice = 5;
    this.destinoService.respuestasSer.pop();
  }

  enviarDestino() {
    // Llama al método `sendDestinity` del servicio `DestinoService`, enviando un objeto con las respuestas seleccionadas
    this.destinoService
      .sendDestinity('answer', {
        userDTO: {
          name: this.destinoService.nombreS.toLocaleLowerCase(),
          email: this.destinoService.correoS.toLocaleLowerCase(),
        },
        destination: this.destinoService.respuestasSer[0].toLocaleLowerCase(),
        weather: this.destinoService.respuestasSer[1].toLocaleLowerCase(),
        activity: this.destinoService.respuestasSer[2].toLocaleLowerCase(),
        hosting: this.destinoService.respuestasSer[3].toLocaleLowerCase(),
        age: this.destinoService.respuestasSer[5].toLocaleLowerCase(),
        travel: this.destinoService.respuestasSer[4].toLocaleLowerCase()
      })
      .then(async (response) => {
        this.destinoService.setDestinoA(response.destinationAmerica);
        this.destinoService.setDestinoE(response.destinationEuropa);
        const imgAmerica = await this.destinoService.getPixabayImages(response.destinationAmerica.site + ' ' + response.destinationAmerica.country);
        const imgEuropa = await this.destinoService.getPixabayImages(response.destinationEuropa.site + ' ' + response.destinationEuropa.country);
        this.destinoService.setImgDestinos({imgAmerica, imgEuropa});
        this.destinoService.setloading(false);
      })
      .catch((error) => {
        console.error('Error al enviar destino:', error);
      });
  }
}
