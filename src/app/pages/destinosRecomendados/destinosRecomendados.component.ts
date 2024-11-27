import { Component } from '@angular/core';
import { DestinoComponent } from '@pages/destino/destino.component';
import { DestinoService } from '@services/destino.service';

@Component({
  selector: 'app-destinosRecomendados',
  standalone: true,
  imports: [DestinoComponent],
  templateUrl: './destinosRecomendados.component.html',
  styleUrl: './destinosRecomendados.component.css',
})
export class DestinosRecomendadosComponent{
  constructor(public destinoService: DestinoService) {}
}