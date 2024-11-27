import { Component, Input } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css'
})
export class DestinoComponent {
  @Input() continente : any;
  @Input() destino: any = {
    site: "",
    country: "",
    language: "",
    unmissablePlace: "",
    typicalFood: ""
  };
  @Input() imgDestino: any;
  constructor(public destinoService: DestinoService) {}
}
