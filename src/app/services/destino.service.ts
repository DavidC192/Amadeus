import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DestinoService {
  private axiosClient: AxiosInstance;
  private pixabayApiKey: string = '47232476-f037f51d74a14bc48e9e96004';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.axiosClient = axios.create({
      baseURL: 'https://back-amadeus-grupo-4-production.up.railway.app/', // URL base para las solicitudes
      // timeout: 5000,
    });

    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.loadDataState();
      }
    }, 100);
  }

  /**
   * Este método realiza una solicitud HTTP POST a un endpoint determinado, enviando los datos proporcionados en el cuerpo de la solicitud.
   * Tras la respuesta, se recibe los posibles destinos, que se devuelve como parte de los datos de la respuesta.
   * Si ocurre un error durante la solicitud, se lanza una excepción.
   *
   * @param {string} endpoint - El endpoint al que se realizará la solicitud POST.
   * @param {any} data - Los datos que se enviarán en el cuerpo de la solicitud.
   * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
   * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
   *
   * @example
   * try {
   *   const data = await this.sendDestinity('/api/endpoint', { key: 'value' });
   *   console.log(data);
   * } catch (error) {
   *   console.error('Error al enviar los datos', error);
   * }
   */
  async sendDestinity(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }  

  /**
   * Este método realiza una solicitud HTTP GET a un endpoint determinado y devuelve la respuesta del servidor.
   * Si ocurre un error durante la solicitud, se lanza una excepción.
   *
   * @param {string} endpoint - El endpoint al que se realizará la solicitud GET.
   * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
   * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
   *
   * @example
   * try {
   *   const data = await this.getDestinity('/api/endpoint/nameDestinity1/nameDestinity2');
   *   console.log(data);
   * } catch (error) {
   *   console.error('Error al obtener los datos', error);
   * }
   */
  async getDestinity(endpoint: string): Promise<any> {
    try {
      const response = await this.axiosClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  async getPixabayImages(query: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${this.pixabayApiKey}&q=${query}&image_type=photo&orientation=horizontal`
      )
      console.log(response.data);
      
      if (response.data.totalHits > 0) {
        for (let i = 0; i < response.data.hits.length; i++) {
          const imageTags = response.data.hits[i].tags.toLowerCase();
          if (
            imageTags.includes("places") ||
            imageTags.includes("city") ||
            imageTags.includes("travel") ||
            imageTags.includes("destination") ||
            imageTags.includes("nature") ||
            imageTags.includes("the colosseum") ||
            imageTags.includes("portals machupicchu")
          ) {
            return response.data.hits[i].largeImageURL;
          }
        }
      
      // return response.data.hits[0].largeImageURL;
      }
    } catch (error) {
      console.error('Error fetching images from Pixabay', error);
      throw error;
    }
  }

  indice: number = 0;
  destinoA: any = {
    site: "",
    country: "",
    language: "",
    unmissablePlace: "",
    typicalFood: ""
  };
  destinoE: any = {
    site: "",
    country: "",
    language: "",
    unmissablePlace: "",
    typicalFood: ""
  };

  respuestasSer: String[] = [];
  nombreS: String = '';
  correoS: String = '';
  avatar: String = 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';
  srcA: any = '';
  srcE: any = '';
  isLoading = signal(true);

  getloading() {
    return this.isLoading();
  }

  getDestinoA() {
    return this.destinoA;
  }

  getDestinoE() {
    return this.destinoE;
  }

  getImgDestinos() {
    return {
      imgAmerica: this.srcA,
      imgEuropa: this.srcE
    };
  }

  setloading(value: boolean) {
    this.isLoading.set(value);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('isLoading', JSON.stringify(value));
    }
  }

  setDestinoA(value: any) {
    this.destinoA = value;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('destinoAmerica', JSON.stringify(value));
    }
  }

  setDestinoE(value: any) {
    this.destinoE = value;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('destinoEuropa', JSON.stringify(value));
    }
  }

  setImgDestinos(value: any) {
    this.srcA = value.imgAmerica;
    this.srcE = value.imgEuropa;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('imgDestinos', JSON.stringify(value));
    }
  }

  private loadDataState() {
    if (isPlatformBrowser(this.platformId)) {
      const loadingState = sessionStorage.getItem('isLoading');
      const destinoAmericaState = sessionStorage.getItem('destinoAmerica');
      const destinoEuropaState = sessionStorage.getItem('destinoEuropa');
      const imgDestinosState = sessionStorage.getItem('imgDestinos') || '';
      if (loadingState && destinoAmericaState && destinoEuropaState) {
        this.isLoading.set(JSON.parse(loadingState));
        this.destinoA = JSON.parse(destinoAmericaState);
        this.destinoE = JSON.parse(destinoEuropaState);
        this.srcA = JSON.parse(imgDestinosState).imgAmerica;
        this.srcE = JSON.parse(imgDestinosState).imgEuropa;
      }
    }
  }
}
