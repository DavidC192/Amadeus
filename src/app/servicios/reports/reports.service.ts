import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'https://back-amadeus-grupo-4-production.up.railway.app/answers';

  async getReportData(params: any): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, { params });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del reporte:', error);
      throw error;
    }
  }
}
